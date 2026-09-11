package com.nexthire.user.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "candidate_social_platforms")
public class CandidateSocialPlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = false)
    private String url;
}
