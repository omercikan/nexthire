package com.nexthire.identity.messaging.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.queue.candidate}")
    private String candidateQueue;

    @Value("${rabbitmq.routing-key.candidate-created}")
    private String candidateCreatedRoutingKey;

    @Value("${rabbitmq.queue.candidate-created-success}")
    private String candidateCreatedQueue;

    @Value("${rabbitmq.routing-key.candidate-created-success}")
    private String candidateCreatedSuccessRoutingKey;

    @Bean
    public Queue candidateQueue() {
        return new Queue(candidateQueue);
    }

    @Bean
    public Queue candidateCreatedQueue() {
        return new Queue(candidateCreatedQueue, true);
    }

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(exchange);
    }

    @Bean
    public Binding candidateBinding() {
        return BindingBuilder
                .bind(candidateQueue())
                .to(exchange())
                .with(candidateCreatedRoutingKey);
    }

    @Bean
    public Binding CandidateUserCreatedBinding() {
        return BindingBuilder
                .bind(candidateCreatedQueue())
                .to(exchange())
                .with(candidateCreatedSuccessRoutingKey);
    }

    @Bean
    public MessageConverter converter() {
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());

        return rabbitTemplate;
    }
}
