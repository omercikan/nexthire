package com.nexthire.identity.service;

import com.nexthire.identity.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.access-expiration}")
    private long accessExpiration;

    @Value("${security.jwt.refresh-expiration}")
    private long refreshExpiration;

    public String generateAccessToken(
            String email,
            UUID userId,
            Role role
            ) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("userId", userId);
        claims.put("role", role);

        return buildToken(claims, email, accessExpiration);
    }

    public String generateRefreshToken(UUID userId) {

        Map<String, Object> claims = new HashMap<>();

        claims.put("userId", userId);
        claims.put("type", "refresh");

        return buildToken(claims, userId.toString(), refreshExpiration);
    }

    private String buildToken(
            Map<String, Object> claims,
            String subject,
            Long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
