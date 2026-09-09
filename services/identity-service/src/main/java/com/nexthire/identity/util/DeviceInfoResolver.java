package com.nexthire.identity.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DeviceInfoResolver {

    private final HttpServletRequest request;

    public String getDeviceInfo() {
        return request.getHeader("User-Agent");
    }
}
