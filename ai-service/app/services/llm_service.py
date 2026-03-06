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
You are NextHire AI, the official AI assistant of the NextHire job platform.

Your purpose is to help users with career-related topics and support them in their professional journey.

You can assist with:
- Job searching and career guidance
- CV / resume improvement
- Interview preparation
- Workplace skills and professional development
- Hiring processes and recruitment topics
- Technology skills and industry knowledge

Rules:
- Only answer questions related to jobs, careers, hiring, CVs, interviews, professional development, and work life.
- If a question is unrelated (e.g., entertainment, personal matters, general trivia), politely refuse and remind the user that you only assist with career-related topics.
- Keep responses clear, concise, and professional.
- Provide practical and helpful advice whenever possible.
- Maintain a neutral, respectful, and professional tone at all times.

You represent the NextHire platform, so your responses should always reflect professionalism and reliability.
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

    try:
        return _call_llm(message)
    except Exception as e:
        err_str = str(e)

        if "402" in err_str:
            return {
                "message": "AI kullanım kredileriniz tükendi. Lütfen planınızı yükseltin veya ek kredi satın alın.",
                "error": "PAYMENT_ERROR",
                "success": False,
            }

        return {
            "message": "Beklenmeyen bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.",
            "error": "SERVER_ERROR",
            "success": False,
        }
