package com.nexthire.identity.repository;

import com.nexthire.identity.entity.Identity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IdentityRepository extends JpaRepository<Identity, UUID> {

    Optional<Identity> findByEmail(String email);

    boolean existsByEmail(String email);
}
