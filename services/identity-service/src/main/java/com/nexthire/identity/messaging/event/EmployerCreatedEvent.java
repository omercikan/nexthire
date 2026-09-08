package com.nexthire.identity.messaging.event;

import com.nexthire.identity.Role;

public record EmployerCreatedEvent(
        Role role,
        String email,
        String password,
        String fullName,
        String companyName,
        String district,
        String taxCity,
        String taxOffice,
        String taxNumber,
        Boolean emailConsent,
        Boolean personalDataConsent
) {
}
