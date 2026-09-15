package com.nexthire.user.messaging.config;

import com.nexthire.user.config.RabbitListenerContainerFactoryUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@RequiredArgsConstructor
public class RabbitMQConfig {

    @Value("${rabbitmq.exchange}")
    @Getter
    private String exchange;

    @Value("${rabbitmq.queue.candidate}")
    private String candidateQueue;

    @Value("${rabbitmq.routing-key.candidate-created}")
    private String candidateCreatedRoutingKey;

    @Value("${rabbitmq.queue.candidate-dlq}")
    private String candidateDLQQueue;

    @Value("${rabbitmq.routing-key.candidate-dlq}")
    private String candidateDLQRoutingKey;

    private final RabbitListenerContainerFactoryUtil rabbitListenerContainerFactoryUtil;

    @Bean
    public Queue candidateQueue() {
        return new Queue(candidateQueue, true);
    }

    @Bean
    public Queue candidateDLQQueue() {
        return new Queue(candidateDLQQueue, true);
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
    public Binding candidateDLQBinding() {
        return BindingBuilder
                .bind(candidateDLQQueue())
                .to(exchange())
                .with(candidateDLQRoutingKey);
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

    @Bean(name = "candidateRabbitListenerContainerFactory")
    public SimpleRabbitListenerContainerFactory candidateRabbitListenerContainerFactory(
            ConnectionFactory connectionFactory,
            RabbitTemplate rabbitTemplate
    ) {
        return rabbitListenerContainerFactoryUtil
                .rabbitListenerContainerFactory(
                        connectionFactory,
                        rabbitTemplate,
                        candidateDLQRoutingKey,
                        converter()
                );
    }
}
