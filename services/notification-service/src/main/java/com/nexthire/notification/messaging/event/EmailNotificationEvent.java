package com.nexthire.notification.messaging.event;

import com.nexthire.notification.EmailTemplate;

import java.util.Map;

public record EmailNotificationEvent(
        String to,
        EmailTemplate template,
        Map<String, Object> variables
) {
}
