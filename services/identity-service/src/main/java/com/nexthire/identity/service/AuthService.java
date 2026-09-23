package com.nexthire.identity.service;

import com.nexthire.identity.Role;
import com.nexthire.identity.dto.LoginRequest;
import com.nexthire.identity.dto.LoginResponse;
import com.nexthire.identity.dto.RegisterCandidateRequest;
import com.nexthire.identity.dto.RegisterEmployerRequest;
import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.entity.RefreshToken;
import com.nexthire.identity.exception.EmailAlreadyExists;
import com.nexthire.identity.exception.UserNotFound;
import com.nexthire.identity.mapper.EventMapper;
import com.nexthire.identity.mapper.IdentityMapper;
import com.nexthire.identity.messaging.event.CandidateCreatedEvent;
import com.nexthire.identity.messaging.event.EmployerCreatedEvent;
import com.nexthire.identity.messaging.producer.IdentityEventProducer;
import com.nexthire.identity.repository.IdentityRepository;
import com.nexthire.identity.repository.RefreshTokenRepository;
import com.nexthire.identity.util.ClientIpResolver;
import com.nexthire.identity.util.CookieUtil;
import com.nexthire.identity.util.DeviceInfoResolver;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final IdentityRepository identityRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final IdentityMapper identityMapper;
    private final EventMapper eventMapper;
    private final IdentityEventProducer identityEventProducer;
    private final CookieUtil cookieUtil;
    private final ClientIpResolver clientIpResolver;
    private final DeviceInfoResolver deviceInfoResolver;

    public LoginResponse login(LoginRequest request) {
        Identity identity = identityRepository
                .findByEmail(request.email())
                .orElseThrow(() -> new UserNotFound("Kullanıcı adı veya şifre hatalı!"));

        boolean isMatchesPassword = passwordEncoder.matches(request.password(), identity.getHashedPassword());

        if (!isMatchesPassword) throw new UserNotFound("Kullanıcı adı veya şifre hatalı!");

        String accessToken = jwtService.generateAccessToken(
                identity.getEmail(),
                identity.getId(),
                identity.getRole()
        );

        String refreshToken = jwtService.generateRefreshToken(
                identity.getId(),
                identity.getEmail(),
                identity.getRole()
        );

        RefreshToken refreshTokenEntity = identityMapper.toRefreshTokenEntity(
                identity.getId(),
                refreshToken,
                jwtService.getRefreshExpiration(),
                deviceInfoResolver.getDeviceInfo(),
                clientIpResolver.getClientIp()
        );

        refreshTokenRepository.save(refreshTokenEntity);

        return new LoginResponse(accessToken, refreshToken);
    }

    public UUID registerCandidate(RegisterCandidateRequest request) {
        assertEmailNotTaken(request.email());

        Identity savedIdentity = createAndSaveIdentity(
                request.email(),
                request.fullName(),
                request.password(),
                Role.CANDIDATE
        );

        CandidateCreatedEvent candidateCreatedEvent = eventMapper.toCreateCandidateEvent(
                savedIdentity.getRole(),
                savedIdentity.getEmail(),
                savedIdentity.getHashedPassword(),
                request.fullName()
        );

        identityEventProducer.publishCandidateCreated(candidateCreatedEvent);

        return savedIdentity.getId();
    }

    public UUID registerEmployer(RegisterEmployerRequest request) {
        assertEmailNotTaken(request.email());

        Identity savedIdentity = createAndSaveIdentity(
                request.email(),
                request.fullName(),
                request.password(),
                Role.EMPLOYER
        );

        EmployerCreatedEvent employerCreatedEvent = eventMapper.toCreateEmployerEvent(
                savedIdentity.getRole(),
                savedIdentity.getEmail(),
                savedIdentity.getHashedPassword(),
                request.fullName(),
                request.phoneNumber(),
                request.companyName(),
                request.district(),
                request.taxCity(),
                request.taxOffice(),
                request.taxNumber(),
                request.emailConsent(),
                request.personalDataConsent()
        );

        identityEventProducer.publishEmployerCreated(employerCreatedEvent);

        return savedIdentity.getId();
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    cookieUtil.deleteCookie(response, cookie.getName());
                }

                if (cookie.getName().equals("refresh_token")) {
                    cookieUtil.deleteCookie(response, cookie.getName());
                }
            }
        }
    }

    private void assertEmailNotTaken(String email) {
        if (identityRepository.existsByEmail(email)) {
            throw new EmailAlreadyExists();
        }
    }

    private Identity createAndSaveIdentity(String email, String fullName, String rawPassword, Role role) {
        String hashedPassword = passwordEncoder.encode(rawPassword);

        Identity identity = identityMapper.toIdentityEntity(
                email,
                fullName,
                hashedPassword,
                role
        );

        return identityRepository.save(identity);
    }
}
