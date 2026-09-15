package com.nexthire.user.messaging.event;


import com.nexthire.user.enums.Role;

public record CandidateCreatedEvent(
        Role role,
        String email,
        String password,
        String fullName
) {
}
