# app/core/settings.py
from pydantic_settings import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "PDF Q&A API"
    SQLALCHEMY_DATABASE_URL: Optional[str] = os.getenv("SQLALCHEMY_DATABASE_URL")
    GOOGLE_API_KEY: Optional[str] = os.getenv("GOOGLE_API_KEY")
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": True
    }

# Create a single settings instance
settings = Settings()
