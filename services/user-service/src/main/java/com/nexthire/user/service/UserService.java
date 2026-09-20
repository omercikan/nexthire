package com.nexthire.user.service;

import com.nexthire.user.entity.Candidate;
import com.nexthire.user.entity.Employer;
import com.nexthire.user.enums.Role;
import com.nexthire.user.mapper.EmployerMapper;
import com.nexthire.user.messaging.event.CandidateCreatedEvent;
import com.nexthire.user.messaging.event.EmployerCreatedEvent;
import com.nexthire.user.repository.CandidateRepository;
import com.nexthire.user.repository.EmployerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key.candidate-created-success}")
    private String candidateCreatedSuccess;

    @Value("${rabbitmq.routing-key.employer-created-success}")
    private String employerCreatedSuccess;

    private final CandidateRepository candidateRepository;
    private final RabbitTemplate rabbitTemplate;
    private final EmployerMapper employerMapper;
    private final EmployerRepository employerRepository;

    public void createCandidate(CandidateCreatedEvent event) {
        if (event.role() != Role.CANDIDATE) return;

        Candidate candidate = new Candidate();

        candidate.setFullName(event.fullName());
        candidate.setEmail(event.email());
        candidate.setPassword(event.password());

        candidateRepository.save(candidate);

        rabbitTemplate
                .convertAndSend(
                        exchange,
                        candidateCreatedSuccess,
                        event
                );
    }

    public void createEmployer(EmployerCreatedEvent event) {
        if (event.role() != Role.EMPLOYER) return;

        Employer employer = employerMapper.toEntity(event);

        employerRepository.save(employer);

        rabbitTemplate
                .convertAndSend(
                        exchange,
                        employerCreatedSuccess,
                        event
                );

    }
}
