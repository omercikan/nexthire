package com.nexthire.identity.controller;

import com.nexthire.identity.dto.*;
import com.nexthire.identity.messaging.sse.RegisterStatusEmitterRegistry;
import com.nexthire.identity.service.AuthService;
import com.nexthire.identity.service.RefreshTokenService;
import com.nexthire.identity.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final CookieUtil cookieUtil;
    private final RegisterStatusEmitterRegistry registerStatusEmitterRegistry;

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

    @PostMapping("/register/candidate")
    public ResponseEntity<ApiResponse<Object>> registerCandidate(@Valid @RequestBody RegisterCandidateRequest request) {
        UUID identityId = authService.registerCandidate(request);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(ApiResponse.success(Map.of(
                        "status", "PENDING",
                        "identityId", identityId
                )));
    }

    @PostMapping("/register/employer")
    public ResponseEntity<ApiResponse<Object>> registerEmployer(@Valid @RequestBody RegisterEmployerRequest request) {
        UUID identityId = authService.registerEmployer(request);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(ApiResponse.success(Map.of(
                        "status", "PENDING",
                        "identityId", identityId
                )));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Void>> refresh(HttpServletRequest request) {
        LoginResponse token = refreshTokenService.refreshToken(request);

        ResponseCookie accessCookie = cookieUtil.createAccessCookie(token.accessToken());
        ResponseCookie refreshCookie = cookieUtil.createRefreshCookie(token.refreshToken());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(ApiResponse.success(null));
    }

    @GetMapping(value = "/register/stream/{identityId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter registerStream(@PathVariable UUID identityId) {
        return registerStatusEmitterRegistry.register(identityId);
    }
}
