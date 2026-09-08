package com.nexthire.identity.controller;

import com.nexthire.identity.dto.ApiResponse;
import com.nexthire.identity.dto.LoginRequest;
import com.nexthire.identity.dto.LoginResponse;
import com.nexthire.identity.dto.RegisterRequest;
import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.service.AuthService;
import com.nexthire.identity.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login(@RequestBody LoginRequest request) {
        LoginResponse token = authService.login(request);

        ResponseCookie accessCookie = cookieUtil.createAccessCookie(token.accessToken());
        ResponseCookie refreshCookie = cookieUtil.createRefreshCookie(token.refreshToken());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(ApiResponse.success(null));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Identity>> register(@Valid @RequestBody RegisterRequest request) {
        Identity identity = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(identity));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

}
