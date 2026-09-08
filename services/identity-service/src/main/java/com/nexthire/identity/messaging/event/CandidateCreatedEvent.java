package com.nexthire.identity.messaging.event;

import com.nexthire.identity.Role;

public record CandidateCreatedEvent(
        Role role,
        String email,
        String password,
        String fullName
) {
}
