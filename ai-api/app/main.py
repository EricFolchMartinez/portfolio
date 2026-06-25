import logging

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from pydantic import BaseModel, Field

from .config import settings
from .knowledge import SYSTEM_PROMPT
from .rate_limit import RateLimiter

logger = logging.getLogger("ai-api")

app = FastAPI(
    title="ericfolch.com — portfolio assistant",
    version="1.0.0",
    # Hide interactive docs in production.
    docs_url=None if settings.is_production else "/docs",
    redoc_url=None if settings.is_production else "/redoc",
    openapi_url=None if settings.is_production else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

client = AsyncOpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None
limiter = RateLimiter(
    per_ip_max=settings.per_ip_max,
    window_seconds=settings.per_ip_window_seconds,
    global_daily_max=settings.global_daily_max,
)


class Message(BaseModel):
    role: str
    content: str = Field(min_length=1)


class ChatRequest(BaseModel):
    messages: list[Message] = Field(min_length=1)


def client_ip(request: Request) -> str:
    """Resolve the real visitor IP behind Cloudflare / Nginx."""
    cf = request.headers.get("cf-connecting-ip")
    if cf:
        return cf.strip()
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@app.get("/api/health")
def health() -> dict:
    return {
        "status": "ok",
        "environment": settings.environment,
        "model": settings.openai_model,
        "ai_configured": client is not None,
    }


@app.post("/api/chat")
async def chat(req: ChatRequest, request: Request) -> dict:
    allowed, reason = limiter.check(client_ip(request))
    if not allowed:
        detail = (
            "Daily limit reached for the assistant. Please try again tomorrow."
            if reason == "global"
            else "Too many messages. Please wait a few minutes and try again."
        )
        raise HTTPException(status_code=429, detail=detail)

    if client is None:
        raise HTTPException(status_code=503, detail="The assistant is not configured.")

    # Sanitize: keep only chat roles, trim history, cap each message length.
    history = [m for m in req.messages if m.role in ("user", "assistant")]
    history = history[-settings.max_history :]
    if not history or history[-1].role != "user":
        raise HTTPException(status_code=400, detail="The last message must be from the user.")

    openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    openai_messages += [
        {"role": m.role, "content": m.content[: settings.max_input_chars]} for m in history
    ]

    try:
        completion = await client.chat.completions.create(
            model=settings.openai_model,
            messages=openai_messages,
            max_tokens=settings.max_output_tokens,
            temperature=0.3,
        )
    except Exception:  # noqa: BLE001 — never leak upstream details to the client
        logger.exception("OpenAI request failed")
        raise HTTPException(status_code=502, detail="The assistant is temporarily unavailable.")

    reply = (completion.choices[0].message.content or "").strip()
    return {"reply": reply}
