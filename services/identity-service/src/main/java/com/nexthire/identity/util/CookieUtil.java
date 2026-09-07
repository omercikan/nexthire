package com.nexthire.identity.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    @Value("${security.jwt.access-expiration}")
    private long accessExpiration;

    @Value("${security.jwt.refresh-expiration}")
    private long refreshExpiration;

    public ResponseCookie createAccessCookie(String token) {
        return buildCookie("access_token", token, accessExpiration / 1000);
    }

    public ResponseCookie createRefreshCookie(String token) {
        return buildCookie("refresh_token", token, refreshExpiration / 1000);
    }

    public ResponseCookie deleteAccessCookie() {
        return buildCookie("access_token", "", 0);
    }

    public ResponseCookie deleteRefreshCookie() {
        return buildCookie("refresh_token", "", 0);
    }

    private ResponseCookie buildCookie(String name, String value, long maxAgeSeconds) {
        return ResponseCookie.from(name, value)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(maxAgeSeconds)
                .sameSite("Strict")
                .build();
    }

}
