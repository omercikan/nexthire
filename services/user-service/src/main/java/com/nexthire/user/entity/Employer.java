package com.nexthire.user.entity;

import com.nexthire.user.enums.Role;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "employers")
public class Employer {

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

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role = Role.EMPLOYER;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @Column(name = "profile_photo_id")
    private String profilePhotoId;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "tax_city", nullable = false)
    private String taxCity;

    @Column(name = "tax_office", nullable = false)
    private String taxOffice;

    @Column(name = "tax_number", nullable = false)
    private String taxNumber;

    @Column(name = "email_consent", nullable = false)
    private Boolean emailConsent;

    @Column(name = "personal_data_consent", nullable = false)
    private Boolean personalDataConsent;

    @ElementCollection
    @CollectionTable(
            name = "employer_categories",
            joinColumns = @JoinColumn(name = "employer_id")
    )
    @Column(name = "category")
    private List<String> categories;

    @OneToMany(
            mappedBy = "employer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<EmployerSocialPlatform> socialPlatforms;

    @Column(name = "failed_attempts", nullable = false)
    private Integer failedAttempts = 0;

    @Column(name = "failed_time", nullable = false)
    private Long failedTime = 0L;

    @Column(name = "company_about", nullable = false)
    private String companyAbout;

    @Column(name = "founded_date", nullable = false)
    private LocalDate foundedDate;

    @Column(name = "company_size", nullable = false)
    private String companySize;

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
