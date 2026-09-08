package com.nexthire.identity.mapper;

import com.nexthire.identity.Role;
import com.nexthire.identity.entity.Identity;
import org.springframework.stereotype.Component;

@Component
public class IdentityMapper {

    public Identity toIdentityEntity(String email, String hashedPassword, Role role) {
        Identity identityEntity = new Identity();

        identityEntity.setEmail(email);
        identityEntity.setHashedPassword(hashedPassword);
        identityEntity.setRole(role);

        return identityEntity;
    }
}
