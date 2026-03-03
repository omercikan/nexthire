import pika
import json
import time
from app.services.llm_service import ask_ai
from app.core.config import getenv


def connect() -> pika.BlockingConnection:
    """
    Establishes a blocking connection to RabbitMQ.
    Retries every 3 seconds until the connection is successful.
    """
    while True:
        try:
            return pika.BlockingConnection(pika.URLParameters(getenv("RABBITMQ_URL")))
        except pika.exceptions.AMQPConnectionError:
            print("Waiting for RabbitMQ...")
            time.sleep(3)


def callback(ch, method, _properties, body: bytes) -> None:
    """
    Processes incoming messages from the 'ai:message' queue.
    Sends the message to the AI service and publishes the response to the 'ai:response' queue.
    On failure, publishes an error payload to 'ai:response' and nacks the message.
    """
    try:
        if not body or not body.strip():
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        data = json.loads(body.decode("utf-8"))

        ai_response = ask_ai(data["message"])

        result = json.dumps(
            {"user_message": data.get("message", ""), "ai_response": ai_response}
        )

        connection = connect()
        channel = connection.channel()
        channel.queue_declare(queue="ai:response", durable=True)

        channel.basic_publish(
            exchange="",
            routing_key="ai:response",
            body=result,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=pika.DeliveryMode.Transient,
            ),
        )

        connection.close()
        print("AI response sent successfully")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except (json.JSONDecodeError, KeyError) as e:
        print(f"Failed to process message: {e}")

        error_result = json.dumps(
            {"user_message": "", "ai_response": None, "error": str(e)}
        )
        connection = connect()
        channel = connection.channel()
        channel.queue_declare(queue="ai:response", durable=True)
        channel.basic_publish(
            exchange="",
            routing_key="ai:response",
            body=error_result,
            properties=pika.BasicProperties(content_type="application/json"),
        )
        connection.close()

        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)


def main() -> None:
    """
    Entry point for the RabbitMQ consumer.
    Connects to RabbitMQ, declares the 'ai:message' queue and starts consuming messages.
    Reconnects automatically on connection failure.
    """
    while True:
        try:
            connection = connect()
            channel = connection.channel()
            channel.queue_declare(queue="ai:message", durable=True)
            channel.basic_qos(prefetch_count=1)
            channel.basic_consume(
                queue="ai:message", on_message_callback=callback, auto_ack=False
            )
            print("Waiting for messages...")
            channel.start_consuming()
        except (
            pika.exceptions.AMQPConnectionError,
            pika.exceptions.AMQPChannelError,
        ) as e:
            print(f"Connection error: {e}, reconnecting...")
            time.sleep(3)


if __name__ == "__main__":
    main()
