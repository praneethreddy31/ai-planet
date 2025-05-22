# app/core/config.py
import os
from pydantic_settings import BaseSettings  # FIXED: correct import
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "PDF Q&A API"
    
    # Database
    SQLALCHEMY_DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")  # Fixed typo in SQLALCHEMY
    
    # API Keys
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    
    model_config = {  # UPDATED: Changed from class Config to model_config dict
        "case_sensitive": True
    }

settings = Settings()
