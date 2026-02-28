from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.ai_router import router
from app.core.config import getenv

app = FastAPI()

origins = [getenv("DEV_URL")]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods="*",
    allow_headers="*",
)

app.include_router(router, prefix="/api/v1/ai")
