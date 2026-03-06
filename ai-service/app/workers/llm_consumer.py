import json
import time
from app.services.llm_service import ask_ai
from app.services.rabbitmq_client import RabbitMQClient


def callback(ch, method, _properties, body: bytes) -> None:
    """
    Processes incoming messages from the 'ai:message' queue.
    Sends the message to the AI service and publishes the response to the 'ai:response' queue.
    On failure, publishes an error payload to 'ai:response' and nacks the message.
    """
    client = RabbitMQClient()
    client.connect()

    try:
        if not body or not body.strip():
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        data = json.loads(body.decode("utf-8"))
        ai_response = ask_ai(data.get("message", ""))

        if isinstance(ai_response, dict) and not ai_response.get("success"):
            result = json.dumps({"ai_response": ai_response})
        else:
            result = json.dumps({"ai_response": {"message": ai_response}})

        client.publish("ai:response", result)
        print("AI response sent successfully")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        print(f"Failed to process message: {e}")
        error_result = json.dumps(
            {"user_message": "", "ai_response": None, "error": str(e)}
        )
        client.publish("ai:response", error_result)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
    finally:
        client.close()


def main() -> None:
    """
    Entry point for the RabbitMQ consumer.
    Connects to RabbitMQ, declares the 'ai:message' queue and starts consuming messages.
    Reconnects automatically on connection failure.
    """

    while True:
        client = RabbitMQClient()
        try:
            client.connect()
            client.ensure_queue("ai:message")
            client.consume("ai:message", callback)
            print("Waiting for messages...")
            client.channel.start_consuming()
        except Exception as e:
            print(f"Connection error: {e}, reconnecting...")
            client.close()
            time.sleep(3)


if __name__ == "__main__":
    main()
