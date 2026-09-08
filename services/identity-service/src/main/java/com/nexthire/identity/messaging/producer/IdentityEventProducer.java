package com.nexthire.identity.messaging.producer;

import com.nexthire.identity.messaging.event.CandidateCreatedEvent;
import com.nexthire.identity.messaging.event.EmployerCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class IdentityEventProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key.candidate-created}")
    private String candidateRoutingKey;

    @Value("${rabbitmq.routing-key.employer-created}")
    private String employerRoutingKey;

    public void publishCandidateCreated(CandidateCreatedEvent event) {
        rabbitTemplate.convertAndSend(
                exchange,
                candidateRoutingKey,
                event
        );
    }

    public void publishEmployerCreated(EmployerCreatedEvent event) {
        rabbitTemplate.convertAndSend(
                exchange,
                employerRoutingKey,
                event
        );
    }
}
