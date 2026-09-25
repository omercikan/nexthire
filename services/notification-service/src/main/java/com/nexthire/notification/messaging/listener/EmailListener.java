package com.nexthire.notification.messaging.listener;

import com.nexthire.notification.messaging.event.EmailNotificationEvent;
import com.nexthire.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailListener {

    private final EmailService emailService;

    @RabbitListener(queues = "${rabbitmq.queue.notification-email}")
    public void handleEmail(EmailNotificationEvent event) {
        emailService.send(
                event.to(),
                event.template(),
                event.variables()
        );
    }
}
