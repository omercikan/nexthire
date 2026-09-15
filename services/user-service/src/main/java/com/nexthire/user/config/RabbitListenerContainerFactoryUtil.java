package com.nexthire.user.config;

import org.springframework.amqp.rabbit.config.RetryInterceptorBuilder;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RabbitListenerContainerFactoryUtil {

    @Value("${rabbitmq.exchange}")
    private String exchange;

    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory,
            RabbitTemplate rabbitTemplate,
            String routingKey,
            MessageConverter messageConverter
    ) {
        SimpleRabbitListenerContainerFactory factory =
                new SimpleRabbitListenerContainerFactory();

        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter);

        RepublishMessageRecoverer recoverer =
                new RepublishMessageRecoverer(
                        rabbitTemplate,
                        exchange,
                        routingKey
                );

        factory.setAdviceChain(
                RetryInterceptorBuilder
                        .stateless()
                        .maxRetries(3)
                        .backOffOptions(
                                5000,
                                2.0,
                                10000
                        )
                        .recoverer(recoverer)
                        .build()
        );

        return factory;
    }
}
