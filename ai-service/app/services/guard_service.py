"""
Lightweight pre-filter for work-related messages.

Provides a simple keyword-based check to determine if a
user message is related to jobs, careers, CVs, interviews,
or professional software topics.
"""

WORK_KEYWORDS = [
    "iş",
    "kariyer",
    "cv",
    "mülakat",
    "iş başvurusu",
    "resume",
    "career",
    "job",
    "interview",
    "work",
    "software",
]


def is_work_related(message: str) -> bool:
    """
    Check if a message is related to work or career topics.

    Args:
        message (str): The user message to check.

    Returns:
        bool: True if the message contains at least one keyword
              from WORK_KEYWORDS, otherwise False.

    Notes:
        - Comparison is case-insensitive.
        - This is intended as a fast pre-filter before sending
          messages to the AI model.
    """
    msg = message.lower()

    return any(keyword in msg for keyword in WORK_KEYWORDS)
