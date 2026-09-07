package com.nexthire.identity.service;

import com.nexthire.identity.dto.LoginRequest;
import com.nexthire.identity.dto.LoginResponse;
import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.exception.UserNotFound;
import com.nexthire.identity.repository.IdentityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final IdentityRepository identityRepository;
    private final PasswordEncoder passwordEncoder;

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
                identity.getId()
        );

        return new LoginResponse(accessToken, refreshToken);
    }
}
