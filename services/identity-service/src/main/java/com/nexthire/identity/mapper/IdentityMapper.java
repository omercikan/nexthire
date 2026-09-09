package com.nexthire.identity.mapper;

import com.nexthire.identity.Role;
import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.entity.RefreshToken;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class IdentityMapper {

    public Identity toIdentityEntity(String email, String hashedPassword, Role role) {
        Identity identityEntity = new Identity();

        identityEntity.setEmail(email);
        identityEntity.setHashedPassword(hashedPassword);
        identityEntity.setRole(role);

        return identityEntity;
    }

    public RefreshToken toRefreshTokenEntity(
            Identity identityEntity,
            String tokenHash,
            long expiresAt,
            String deviceInfo,
            String ipAddress
    ) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setTokenHash(tokenHash);
        refreshToken.setUserId(identityEntity.getId());
        refreshToken.setExpiresAt(new Date(System.currentTimeMillis() + expiresAt));
        refreshToken.setDeviceInfo(deviceInfo);
        refreshToken.setIpAddress(ipAddress);

        return refreshToken;
    }
}
