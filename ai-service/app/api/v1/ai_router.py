from fastapi import APIRouter, HTTPException
from app.services.llm_service import ask_ai
from pydantic import BaseModel

router = APIRouter()


class AIRequest(BaseModel):
    """
    Input model for AI requests.

    Attributes:
        message (str): The message content to be sent to the AI.
    """

    message: str


class AIRESPONSE(BaseModel):
    """
    Pydantic model representing the AI assistant's response.

    Attributes:
        message (str): The AI-generated reply.
        error (str | None): Optional error message if an error occurred.
        success (bool): Indicates whether the request was successful.
    """

    message: str
    error: str | None = None
    success: bool = True


@router.post("/ask", response_model=AIRESPONSE)
def chat_ai(request: AIRequest) -> AIRESPONSE:
    """
    Send a user message to the AI assistant and get a response.

    This endpoint forwards the input message to the `ask_ai` service,
    which handles:
        - Filtering out non-work-related queries
        - Classifying user intent
        - Generating a professional AI response

    Args:
        message (str): The user input message to be processed.

    Returns:
        AIRESPONSE: The response model containing the AI message, error info,
                    and success status.

    Raises:
        HTTPException:
            - 400 if the message field is empty.
            - 402 if AI usage credits are exhausted.
            - 500 for any unexpected server error.

    Notes:
        - Designed for integration in a job/career platform.
        - All responses are concise and work/career-related.
        - Non-work-related queries are politely refused by the service.
    """

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail={
                "message": "The 'message' field is required and cannot be empty.",
                "error": "BAD_REQUEST",
                "success": False,
            },
        )

    try:
        result = ask_ai(request.message)
        return AIRESPONSE(message=result)
    except Exception as e:
        status_code = getattr(e, "status_code", None) or 500
        err_str = str(e)

        if "402" in err_str or "credits" in err_str:
            raise HTTPException(
                detail={
                    "message": "Your AI usage credits are exhausted. Please upgrade your plan or purchase additional credits.",
                    "error": "PAYMENT_ERROR",
                    "success": False,
                },
                status_code=status_code,
            ) from e

        if "GUARD_REJECTION" in err_str:
            raise HTTPException(
                detail={
                    "message": "This AI assistant only provides assistance with work, career, CV, and interview topics.",
                    "error": "GUARD_REJECTION",
                    "success": False,
                },
                status_code=400,
            ) from e

        raise HTTPException(
            detail={
                "message": "An unexpected server error occurred. Please try again later.",
                "error": "SERVER_ERROR",
                "success": False,
            },
            status_code=status_code,
        ) from e
