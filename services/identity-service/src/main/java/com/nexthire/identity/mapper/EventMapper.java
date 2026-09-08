package com.nexthire.identity.mapper;

import com.nexthire.identity.Role;
import com.nexthire.identity.messaging.event.CandidateCreatedEvent;
import com.nexthire.identity.messaging.event.EmployerCreatedEvent;
import org.springframework.stereotype.Component;


@Component
public class EventMapper {

    public CandidateCreatedEvent toCreateCandidateEvent(
            Role role,
            String email,
            String password,
            String fullName
    ) {
        return new CandidateCreatedEvent(role, email, password, fullName);
    }

    public EmployerCreatedEvent toCreateEmployerEvent(
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
        return new EmployerCreatedEvent(
                role,
                email,
                password,
                fullName,
                companyName,
                district,
                taxCity,
                taxOffice,
                taxNumber,
                emailConsent,
                personalDataConsent
        );
    }
}
