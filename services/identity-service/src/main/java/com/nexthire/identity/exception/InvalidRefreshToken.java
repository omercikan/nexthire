package com.nexthire.identity.exception;

public class InvalidRefreshToken extends RuntimeException {

    public InvalidRefreshToken(String message) {
        super(message);
    }
}
