package com.nexthire.identity.dto;

import jakarta.validation.constraints.*;

public record RegisterEmployerRequest(
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        String password,

        @NotBlank(message = "Full name is required")
        @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
        String fullName,

        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^\\+?[0-9]{10,13}$", message = "Invalid phone number format")
        String phoneNumber,

        @NotBlank(message = "Company name is required")
        @Size(min = 2, max = 150, message = "Company name must be between 2 and 150 characters")
        String companyName,

        @NotBlank(message = "District is required")
        @Size(max = 100, message = "District must be at most 100 characters")
        String district,

        @NotBlank(message = "Tax city is required")
        @Size(max = 100, message = "Tax city must be at most 100 characters")
        String taxCity,

        @NotBlank(message = "Tax office is required")
        @Size(max = 150, message = "Tax office must be at most 150 characters")
        String taxOffice,

        @NotBlank(message = "Tax number is required")
        @Pattern(regexp = "^[0-9]{10}$", message = "Tax number must be exactly 10 digits")
        String taxNumber,

        @NotNull(message = "Email consent must be specified")
        Boolean emailConsent,

        @NotNull(message = "Personal data consent must be specified")
        @AssertTrue(message = "Personal data consent must be accepted")
        Boolean personalDataConsent
) {}