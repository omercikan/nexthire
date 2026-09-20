package com.nexthire.identity.messaging.listener;

import com.nexthire.identity.messaging.event.CandidateCreatedEvent;
import com.nexthire.identity.messaging.event.EmployerCreatedEvent;
import com.nexthire.identity.service.IdentityService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserListener {

    private final IdentityService identityService;

    @RabbitListener(queues = "${rabbitmq.queue.candidate-created-success}")
    public void handleCandidateUserCreated(CandidateCreatedEvent event) {
        identityService.activate(event.email());
    }

    @RabbitListener(queues = "${rabbitmq.queue.employer-created-success}")
    public void handleEmployerUserCreated(EmployerCreatedEvent event) {
        identityService.activate(event.email());
    }
}
