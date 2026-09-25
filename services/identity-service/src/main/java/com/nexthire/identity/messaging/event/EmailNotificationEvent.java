package com.nexthire.identity.messaging.event;

import com.nexthire.identity.enums.EmailTemplate;

import java.util.Map;

public record EmailNotificationEvent(
        String to,
        EmailTemplate template,
        Map<String, Object> variables
) {
}
