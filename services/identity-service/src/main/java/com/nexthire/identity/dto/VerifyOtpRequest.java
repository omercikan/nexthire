package com.nexthire.identity.dto;

public record VerifyOtpRequest(
        String resetToken,
        String code
) {
}
