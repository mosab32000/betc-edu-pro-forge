from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PORT: int = 8000
    ENVIRONMENT: str = 'development'
    MODEL_NAME: str = 'meta-llama/Llama-2-7b-chat-hf'
    USE_4BIT: bool = True
    REDIS_URL: str = 'redis://localhost:6379'
    LOG_LEVEL: str = 'INFO'

    class Config:
        env_file = '.env'


settings = Settings()
