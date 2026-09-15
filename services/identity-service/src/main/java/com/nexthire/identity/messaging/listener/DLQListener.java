package com.nexthire.identity.messaging.listener;

import com.nexthire.identity.messaging.event.CandidateCreatedEvent;
import com.nexthire.identity.service.IdentityService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DLQListener {

    private final IdentityService identityService;

    @RabbitListener(queues = "${rabbitmq.queue.candidate-dlq}")
    public void handleCreateUserFailed(CandidateCreatedEvent event) {
        identityService.failed(event.email());
    }
}
