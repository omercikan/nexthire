package com.nexthire.user.messaging.listener;

import com.nexthire.user.messaging.event.CandidateCreatedEvent;
import com.nexthire.user.messaging.event.EmployerCreatedEvent;
import com.nexthire.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserRegistrationListener {

    private final UserService userService;

    @RabbitListener(
            queues = "candidate.queue",
            containerFactory = "candidateRabbitListenerContainerFactory"
    )
    public void candidateRegistrationListen(CandidateCreatedEvent event) {
        userService.createCandidate(event);
    }


    @RabbitListener(
            queues = "employer.queue",
            containerFactory = "employerRabbitListenerContainerFactory"
    )
    public void employerRegistrationListen(EmployerCreatedEvent event) {
        userService.createEmployer(event);
    }
}
