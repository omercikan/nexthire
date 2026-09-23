package com.nexthire.identity.controller;

import com.nexthire.identity.dto.ForgotPasswordRequest;
import com.nexthire.identity.dto.VerifyOtpRequest;
import com.nexthire.identity.enums.OtpVerificationResult;
import com.nexthire.identity.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request){
        String resetToken = otpService.sendForgotPasswordOtp(request.email());

        if(resetToken == null){
            resetToken = UUID.randomUUID().toString();
        }

        return ResponseEntity.ok(Map.of("resetToken", resetToken));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {
        OtpVerificationResult result = otpService.verifyResetToken(
                request.resetToken(),
                request.code()
        );

        return switch (result) {
            case SUCCESS -> ResponseEntity.ok().build();
            case INVALID_CODE -> ResponseEntity.badRequest().body("Kod hatalı");
            case EXPIRED -> ResponseEntity.badRequest().body("Kod süresi dolmuş");
            case TOO_MANY_ATTEMPTS -> ResponseEntity.status(429).body("Çok fazla deneme yapıldı");
        };
    }
}
