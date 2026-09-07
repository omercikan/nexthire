package com.nexthire.identity.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        Date timestamp,
        String message,
        T data
) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, new Date(), null, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, new Date(), message, null);
    }
}
