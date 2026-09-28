package com.nexthire.gateway.filter;

import com.nexthire.gateway.security.JwtValidator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter {

    private final JwtValidator jwtValidator;

    public HandlerFilterFunction<ServerResponse, ServerResponse> filter() {
        return (request, next) -> {
            String token = extractTokenFromCookie(request);

            if (token == null) {
                return ServerResponse.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "message",
                        "Bu işlemi yapabilmek için giriş yapmanız gerekiyor",
                        "status",
                        "UNAUTHORIZED"
                ));
            }

            try {
                Claims claims = jwtValidator.validateAndExtractClaims(token);

                ServerRequest serverRequest = ServerRequest.from(request)
                        .header("X-User-Id", String.valueOf(claims.get("userId")))
                        .header("X-User-Role", String.valueOf(claims.get("role")))
                        .build();

                return next.handle(serverRequest);
            } catch (ExpiredJwtException e) {
                return ServerResponse.status(401).body(Map.of(
                        "message",
                        "Oturum süreniz dolmuş, lütfen tekrar giriş yapın.",
                        "status",
                        "EXPIRED"
                ));
            } catch (JwtException e) {
                return ServerResponse.status(401).body(Map.of(
                        "message",
                        "Geçersiz oturum bilgisi, lütfen tekrar giriş yapın.",
                        "status",
                        "INVALID_TOKEN"
                ));
            }
        };
    }

    private String extractTokenFromCookie(ServerRequest request) {
        HttpServletRequest servletRequest = request.servletRequest();

        Cookie[] cookies = servletRequest.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("access_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
