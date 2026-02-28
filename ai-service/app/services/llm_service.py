"""
Lightweight LLM service helper.

Handles sending user messages to the configured LLM provider
(HuggingFace router via OpenAI-compatible API) and returns
the model's textual response.
"""

from openai import OpenAI
from app.core.config import getenv
from app.services.guard_service import is_work_related
from app.services.intent_service import classify_intent


REFUSAL_MESSAGE = (
    "Bu AI asistanı yalnızca iş, kariyer, CV ve mülakat konularında yardımcı olmaktadır."
)

def ask_ai(message: str) -> str:
    """
    Send a user message to the LLM and return the generated response.

    Args:
        message (str): The user prompt to be processed by the model.

    Returns:
        str: The model's response content as plain text.

    Notes:
        - Uses environment-based configuration (BASE_URL, HF_TOKEN).
        - Designed to be called from service layer (e.g. FastAPI endpoints).
    """

    if not is_work_related(message):
        return REFUSAL_MESSAGE

    if not classify_intent(message):
        return REFUSAL_MESSAGE

    client = OpenAI(
        base_url=getenv("BASE_URL"),
        api_key=getenv("HF_TOKEN"),
    )

    completion = client.chat.completions.create(
        model="moonshotai/Kimi-K2-Instruct-0905",
        messages=[
            {"role": "system", "content": getenv("SYSTEM_PROMPT")},
            {"role": "user", "content": message},
        ],
    )

    return completion.choices[0].message.content
