import time
from typing import Callable
from app.core.config import getenv
import pika


class RabbitMQClient:
    """Manages RabbitMQ connection, channel, and messaging operations."""

    def __init__(self):
        self.connection: pika.BlockingConnection | None = None
        self.channel: pika.channel.Channel | None = None

    def connect(self) -> None:
        """
        Establishes a blocking connection to RabbitMQ and opens a channel.
        Retries every 3 seconds until the connection is successful.
        """
        while True:
            try:
                self.connection = pika.BlockingConnection(
                    pika.URLParameters(getenv("RABBITMQ_URL"))
                )
                self.channel = self.connection.channel()
                print("Connected to RabbitMQ")
                return
            except Exception:
                print("Waiting for RabbitMQ...")
                time.sleep(3)

    def ensure_queue(self, queue: str) -> None:
        """
        Declares a durable queue if it does not already exist.

        Args:
            queue: Name of the queue to declare.
        """
        self.channel.queue_declare(queue=queue, durable=True)

    def publish(self, queue: str, body: str) -> None:
        """
        Publishes a JSON message to the specified queue.

        Args:
            queue: Name of the target queue.
            body: JSON-encoded string to publish.
        """
        self.ensure_queue(queue)
        self.channel.basic_publish(
            exchange="",
            routing_key=queue,
            body=body,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=pika.DeliveryMode.Transient,
            ),
        )

    def consume(self, queue: str, callback: Callable) -> None:
        """
        Registers a callback to consume messages from the specified queue.
        Sets prefetch count to 1 to process one message at a time.

        Args:
            queue: Name of the queue to consume from.
            callback: Function to call when a message is received.
        """
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(
            queue=queue, on_message_callback=callback, auto_ack=False
        )

    def close(self) -> None:
        """Closes the RabbitMQ connection if it is currently open."""
        if self.connection and not self.connection.is_closed:
            self.connection.close()
