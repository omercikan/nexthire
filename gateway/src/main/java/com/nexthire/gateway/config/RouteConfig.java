package com.nexthire.gateway.config;

import com.nexthire.gateway.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.LoadBalancerFilterFunctions.lb;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;

@Configuration
@RequiredArgsConstructor
public class RouteConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public RouterFunction<ServerResponse> routes() {
        return route("public-auth")
                .route(path("/api/auth/login"), http())
                .filter(lb("IDENTITY-SERVICE"))
                .build()
                .and(
                        route("public-register-candidate")
                                .route(path("/api/auth/register/candidate"), http())
                                .filter(lb("IDENTITY-SERVICE"))
                                .build()
                ).and(
                        route("public-register-employer")
                                .route(path("/api/auth/register/employer"), http())
                                .filter(lb("IDENTITY-SERVICE"))
                                .build()
                ).and(
                        route("public-refresh")
                                .route(path("/api/auth/refresh"), http())
                                .filter(lb("IDENTITY-SERVICE"))
                                .build()
                ).and(
                        route("protected-auth")
                                .route(path("/api/auth/logout"), http())
                                .filter(jwtAuthenticationFilter.filter())
                                .filter(lb("IDENTITY-SERVICE"))
                                .build()
                ).and(
                        route("protected-register-stream")
                                .route(path("/api/auth/register/stream/**"), http())
                                .filter(jwtAuthenticationFilter.filter())
                                .filter(lb("IDENTITY-SERVICE"))
                                .build()
                );

    }
}
