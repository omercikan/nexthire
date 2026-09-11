package com.nexthire.user.entity;

import com.nexthire.user.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role = Role.CANDIDATE;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @Column(name = "profile_photo_id")
    private String profilePhotoId;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private Integer age;

    @Column(name = "title")
    private String title;

    @Column(name = "last_work_place")
    private String lastWorkPlace;

    @Column(name = "experience_time")
    private String experienceTime;

    @Column(name = "personal_data_consent", nullable = false)
    private Boolean personalDataConsent = false;

    @OneToMany(
            mappedBy = "candidate",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CandidateSocialPlatform> socialPlatforms;

    @Column(name = "failed_attempts", nullable = false)
    private Integer failedAttempts = 0;

    @Column(name = "failed_time", nullable = false)
    private Long failedTime = 0L;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}