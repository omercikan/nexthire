package com.nexthire.identity.messaging.producer;

import com.nexthire.identity.messaging.event.EmailNotificationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key.notification-email}")
    private String notificationEmailRoutingKey;


    public void publishEmailNotification(EmailNotificationEvent event) {
        rabbitTemplate.convertAndSend(exchange, notificationEmailRoutingKey, event);
    }
}
