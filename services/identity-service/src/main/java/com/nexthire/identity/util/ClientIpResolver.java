package com.nexthire.identity.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientIpResolver {

    private final HttpServletRequest httpRequest;

    public String getClientIp() {
        String forwardedFor = httpRequest.getHeader("X-Forwarded-For");

        if (forwardedFor != null && !forwardedFor.isEmpty()) {
            return forwardedFor.split(",")[0];
        }

        return httpRequest.getRemoteAddr();
    }
}
