package com.nexthire.identity.service;

import com.nexthire.identity.Role;
import com.nexthire.identity.dto.LoginRequest;
import com.nexthire.identity.dto.LoginResponse;
import com.nexthire.identity.dto.RegisterRequest;
import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.exception.EmailAlreadyExists;
import com.nexthire.identity.exception.UserNotFound;
import com.nexthire.identity.mapper.EventMapper;
import com.nexthire.identity.mapper.IdentityMapper;
import com.nexthire.identity.messaging.event.CandidateCreatedEvent;
import com.nexthire.identity.messaging.event.EmployerCreatedEvent;
import com.nexthire.identity.messaging.producer.IdentityEventProducer;
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
    private final IdentityMapper userMapper;
    private final EventMapper eventMapper;
    private final IdentityEventProducer identityEventProducer;

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

    public Identity register(RegisterRequest request) {
        if (identityRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExists();
        }

        String hashedPassword = passwordEncoder.encode(request.password());

        Identity identity = userMapper.toEntity(
                request.email(),
                hashedPassword,
                request.role()
        );

        Identity savedIdentity = identityRepository.save(identity);

        if (savedIdentity.getRole() == Role.CANDIDATE) {
            CandidateCreatedEvent candidateCreatedEvent = eventMapper.toCreateCandidateEvent(
                    savedIdentity.getRole(),
                    savedIdentity.getEmail(),
                    hashedPassword,
                    request.fullName()
            );

            identityEventProducer.publishCandidateCreated(candidateCreatedEvent);

        } else if (savedIdentity.getRole() == Role.EMPLOYER) {

            EmployerCreatedEvent employerCreatedEvent = eventMapper.toCreateEmployerEvent(
                    savedIdentity.getRole(),
                    savedIdentity.getEmail(),
                    hashedPassword,
                    request.fullName(),
                    request.companyName(),
                    request.district(),
                    request.taxCity(),
                    request.taxOffice(),
                    request.taxNumber(),
                    request.emailConsent(),
                    request.personalDataConsent()
            );

            identityEventProducer.publishEmployerCreated(employerCreatedEvent);
        }

        return savedIdentity;
    }
}
