package com.nexthire.identity.service;

import com.nexthire.identity.Role;
import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.enums.Status;
import com.nexthire.identity.exception.UserNotFound;
import com.nexthire.identity.messaging.sse.RegisterStatusEmitterRegistry;
import com.nexthire.identity.repository.IdentityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class IdentityService {

    private final IdentityRepository identityRepository;
    private final RegisterStatusEmitterRegistry registerStatusEmitterRegistry;
    private final OtpService otpService;

    public void activate(String email) {
        Identity identity = identityRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFound("User not found: " + email)
                );

        if (identity.getStatus() != Status.PENDING) return;

        identity.setStatus(Status.ACTIVE);
        identityRepository.save(identity);

        registerStatusEmitterRegistry.notify(identity.getId(), Status.ACTIVE);

        if(identity.getRole() == Role.EMPLOYER) {
            otpService.sendRegistrationOtp(email, identity.getFullName());
        }
    }

    public void failed(String email) {
        Identity identity = identityRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFound("User not found: " + email)
                );

        if (identity.getStatus() != Status.PENDING) return;

        identity.setStatus(Status.FAILED);
        identityRepository.save(identity);

        registerStatusEmitterRegistry.notify(identity.getId(), Status.FAILED);
    }
}
