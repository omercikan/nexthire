"""
Intent classification helper using LLM.

Uses the configured OpenAI-compatible model to determine whether
a given message is related to jobs, careers, hiring, CVs, interviews,
work life, or technical skills. Designed as a second-layer filter
before generating full AI responses.
"""

from openai import OpenAI
from app.core.config import getenv

client = OpenAI(
    base_url=getenv("BASE_URL"),
    api_key=getenv("HF_TOKEN"),
)


def classify_intent(message: str) -> bool:
    """
    Classify whether a message is work-related using the LLM.

    Args:
        message (str): The user message to classify.

    Returns:
        bool: True if the LLM determines the message is work-related,
              False otherwise.

    Notes:
        - Uses a deterministic response (temperature=0) for consistency.
        - Expected output from the model is strictly 'YES' or 'NO'.
        - This function serves as a safeguard against off-topic queries
          and potential prompt injection attempts.
    """

    completion = client.chat.completions.create(
        model="moonshotai/Kimi-K2-Instruct-0905",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an intent classifier.\n"
                    "Return only YES or NO.\n"
                    "YES if the message is related to jobs, careers, hiring, CV, interviews, work life, or tech skills.\n"
                    "Otherwise return NO."
                ),
            },
            {"role": "user", "content": message},
        ],
        temperature=0,
    )

    result = completion.choices[0].message.content.strip().upper()

    return result == "YES"
