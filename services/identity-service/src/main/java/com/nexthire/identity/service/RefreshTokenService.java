package com.nexthire.identity.service;

import com.nexthire.identity.Role;
import com.nexthire.identity.dto.LoginResponse;
import com.nexthire.identity.entity.RefreshToken;
import com.nexthire.identity.exception.InvalidRefreshToken;
import com.nexthire.identity.mapper.IdentityMapper;
import com.nexthire.identity.repository.RefreshTokenRepository;
import com.nexthire.identity.util.ClientIpResolver;
import com.nexthire.identity.util.DeviceInfoResolver;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final ClientIpResolver clientIpResolver;
    private final DeviceInfoResolver deviceInfoResolver;
    private final IdentityMapper identityMapper;

    public LoginResponse refreshToken(HttpServletRequest request) {
        String refreshToken = getRefreshToken(request);

        RefreshToken oldToken = refreshTokenRepository
                .findByTokenHash(refreshToken)
                .orElseThrow(() -> new InvalidRefreshToken("Invalid refresh token"));

        if (oldToken.isRevoked()) {
            throw new InvalidRefreshToken("Token has been revoked");
        }

        boolean isTokenExpired = jwtService.isTokenExpired(refreshToken);

        if (isTokenExpired) {
            oldToken.setRevoked(true);
            refreshTokenRepository.save(oldToken);
            throw new InvalidRefreshToken("Refresh token expired");
        }

        Claims claims = jwtService.extractClaims(refreshToken);

        String email = (String) claims.get("sub");

        UUID userId = UUID.fromString(
                (String) claims.get("userId")
        );

        Role role = Role.valueOf(
                (String) claims.get("role")
        );

        String accessToken = jwtService.generateAccessToken(
                email,
                userId,
                role
        );

        String newRefreshTokenHash = jwtService.generateRefreshToken(
                userId,
                email,
                role
        );

        RefreshToken newRefreshToken = identityMapper.toRefreshTokenEntity(
                oldToken.getUserId(),
                newRefreshTokenHash,
                jwtService.getRefreshExpiration(),
                deviceInfoResolver.getDeviceInfo(),
                clientIpResolver.getClientIp()
        );

        refreshTokenRepository.save(newRefreshToken);

        oldToken.setRevoked(true);
        oldToken.setReplacedByTokenId(newRefreshToken.getId());

        refreshTokenRepository.save(oldToken);

        return new LoginResponse(accessToken, newRefreshTokenHash);
    }

    private static String getRefreshToken(HttpServletRequest request) {
        Cookie refreshTokenCookie = null;

        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh_token")) {
                    refreshTokenCookie = cookie;
                    break;
                }
            }
        }

        if (refreshTokenCookie == null) {
            throw new InvalidRefreshToken("Invalid refresh token");
        }

        return refreshTokenCookie.getValue();
    }
}
