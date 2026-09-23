package com.nexthire.identity.redis.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class OtpData {
    private String code;
    private String email;
    private LocalDateTime expiresAt;
    private int attemptCount;
}
