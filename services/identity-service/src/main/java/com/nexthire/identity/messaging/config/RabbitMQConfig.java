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

    @Value("${rabbitmq.queue.employer}")
    private String employerQueue;

    @Value("${rabbitmq.routing-key.candidate-created}")
    private String candidateCreatedRoutingKey;

    @Value("${rabbitmq.routing-key.employer-created}")
    private String employerCreatedRoutingKey;

    @Bean
    public Queue candidateQueue() {
        return new Queue(candidateQueue);
    }

    @Bean
    public Queue employerQueue() {
        return new Queue(employerQueue);
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
    public Binding employerBinding() {
        return BindingBuilder
                .bind(employerQueue())
                .to(exchange())
                .with(employerCreatedRoutingKey);
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
