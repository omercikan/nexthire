package com.nexthire.user.repository;

import com.nexthire.user.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {
}
