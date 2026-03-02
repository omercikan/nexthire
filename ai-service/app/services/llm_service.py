"""
Lightweight LLM service helper.

Handles sending user messages to the configured LLM provider
(HuggingFace router via OpenAI-compatible API) and returns
the model's textual response.
"""

import logging
import openai
from openai import OpenAI
from app.core.config import getenv
from app.services.guard_service import is_work_related
from app.services.intent_service import classify_intent
from tenacity import (
    retry,
    stop_after_attempt,
    wait_random_exponential,
    retry_if_exception_type,
    before_sleep_log,
)

logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """
You are an AI assistant integrated into a job platform.

Rules:
- Only answer questions related to jobs, careers, CV, interviews, hiring, tech skills, and work life.
- If the question is unrelated to work or careers, politely refuse.
- Keep answers concise and professional.
- Do not answer personal, entertainment, or unrelated questions.
"""

RETRYABLE_EXCEPTIONS = (
    openai.RateLimitError,
    openai.APIConnectionError,
    openai.InternalServerError,
)

client = OpenAI(
    base_url=getenv("BASE_URL"),
    api_key=getenv("HF_TOKEN"),
)


@retry(
    stop=stop_after_attempt(3),
    wait=wait_random_exponential(min=1, max=20),
    retry=retry_if_exception_type(RETRYABLE_EXCEPTIONS),
    before_sleep=before_sleep_log(logger, logging.WARNING),
    reraise=True,
)
def _call_llm(message: str) -> dict:
    completion = client.chat.completions.create(
        model="moonshotai/Kimi-K2-Instruct-0905",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": message},
        ],
    )

    return completion.choices[0].message.content


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

    if not is_work_related(message) or not classify_intent(message):
        raise ValueError("GUARD_REJECTION")

    return _call_llm(message)
