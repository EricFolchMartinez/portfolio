from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """App configuration, populated from environment variables / .env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    # "production" hides /docs and /redoc and tightens behaviour.
    environment: str = "development"

    # Rate limiting (protects the OpenAI budget)
    per_ip_max: int = 8  # requests per IP...
    per_ip_window_seconds: int = 600  # ...per this window (10 min)
    global_daily_max: int = 500  # hard cap across all visitors per day

    # Model / payload limits
    max_output_tokens: int = 300
    max_input_chars: int = 600  # per message
    max_history: int = 6  # messages kept from the conversation

    # Comma-separated list of allowed CORS origins.
    allowed_origins: str = "http://localhost:4321"

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
