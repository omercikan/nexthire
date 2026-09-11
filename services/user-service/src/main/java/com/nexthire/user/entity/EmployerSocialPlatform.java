package com.nexthire.user.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "employer_social_platforms")
public class EmployerSocialPlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = false)
    private String url;
}
