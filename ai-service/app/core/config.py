"""
Configuration module for AI service.

Loads environment variables and provides helper utilities
to access required configuration values such as API tokens.
"""

import os
from dotenv import load_dotenv

ENV = os.environ

# Load environment variables from .env file
load_dotenv()


def getenv(key: str) -> str:
    """
    Retrieve an environment variable safely.

    Raises:
        RuntimeError: If the environment variable is not found.
    """

    value = ENV[key]
    if value is None:
        raise RuntimeError(f"Missing required environment variable: {key}")
    return value
