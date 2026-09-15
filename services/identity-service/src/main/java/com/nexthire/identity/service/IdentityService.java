package com.nexthire.identity.service;

import com.nexthire.identity.entity.Identity;
import com.nexthire.identity.enums.Status;
import com.nexthire.identity.exception.UserNotFound;
import com.nexthire.identity.repository.IdentityRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class IdentityService {

    private final IdentityRepository identityRepository;

    @Transactional
    public void activate(String email) {
        Identity identity = identityRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFound("User not found: " + email)
                );

        if (identity.getStatus() != Status.PENDING) return;

        identity.setStatus(Status.ACTIVE);
    }

    @Transactional
    public void failed(String email) {
        Identity identity = identityRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFound("User not found: " + email)
                );

        if (identity.getStatus() != Status.PENDING) return;

        identity.setStatus(Status.FAILED);
    }
}
