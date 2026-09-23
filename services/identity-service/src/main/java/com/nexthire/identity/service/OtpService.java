package com.nexthire.identity.service;

import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.enums.EmailTemplate;
import com.nexthire.identity.enums.OtpVerificationResult;
import com.nexthire.identity.messaging.event.EmailNotificationEvent;
import com.nexthire.identity.messaging.producer.NotificationEventProducer;
import com.nexthire.identity.redis.model.OtpData;
import com.nexthire.identity.repository.IdentityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class OtpService {

    private static final Duration OTP_TTL = Duration.ofMinutes(5);
    private static final int MAX_ATTEMPTS = 5;
    private static final String OTP_KEY_PREFIX = "identity-service:otp:";

    private final RedisTemplate<String, Object> redisTemplate;
    private final NotificationEventProducer notificationEventProducer;
    private final IdentityRepository identityRepository;

    public String generateAndSendOtp(String email, String fullName) {
        String code = generateSixDigitCode();

        OtpData otpData = new OtpData(
                code,
                email,
                LocalDateTime.now().plus(OTP_TTL),
                0
        );

        redisTemplate.opsForValue().set(
                OTP_KEY_PREFIX + email,
                otpData,
                OTP_TTL
        );

        String resetToken = generateResetToken(email);

        notificationEventProducer.publishEmailNotification(
                new EmailNotificationEvent(
                        email,
                        EmailTemplate.OTP_VERIFICATION,
                        Map.of(
                                "code", code,
                                "resetToken", resetToken,
                                "fullName", fullName != null ? fullName : ""
                        )
                )
        );

        return resetToken;
    }

    public String sendForgotPasswordOtp(String email) {
        Optional<Identity> identity = identityRepository.findByEmail(email);

        return identity.map(value -> generateAndSendOtp(email, value.getFullName())).orElse(null);
    }

    public void sendRegistrationOtp(String email, String fullName) {
        generateAndSendOtp(email, fullName);
    }

    public OtpVerificationResult verifyOtp(String email, String code) {
        String key = OTP_KEY_PREFIX + email;
        OtpData otpData = (OtpData) redisTemplate.opsForValue().get(key);

        if (otpData == null) {
            return OtpVerificationResult.EXPIRED;
        }

        if (otpData.getAttemptCount() >= MAX_ATTEMPTS) {
            redisTemplate.delete(key);
            return OtpVerificationResult.TOO_MANY_ATTEMPTS;
        }

        if (!otpData.getCode().equals(code)) {
            otpData.setAttemptCount(otpData.getAttemptCount() + 1);

            Long remainingTtl = redisTemplate.getExpire(key, TimeUnit.SECONDS);
            redisTemplate.opsForValue().set(key, otpData, Duration.ofSeconds(remainingTtl));

            return OtpVerificationResult.INVALID_CODE;
        }

        redisTemplate.delete(key);
        return OtpVerificationResult.SUCCESS;
    }

    private String generateSixDigitCode() {
        return String.valueOf(new SecureRandom().nextInt(900_000) + 100_000);
    }

    private String generateResetToken(String email) {
        String resetToken = UUID.randomUUID().toString();

        redisTemplate.opsForValue().set(
                "reset-token:" + resetToken,
                email,
                OTP_TTL
        );

        return resetToken;
    }

    public OtpVerificationResult verifyResetToken(String resetToken, String code) {
        String email = (String) redisTemplate.opsForValue().get("reset-token:" + resetToken);

        if (email == null) {
            return OtpVerificationResult.EXPIRED;
        }

        return verifyOtp(email, code);
    }
}
