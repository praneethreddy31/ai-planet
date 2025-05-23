
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "PDF Q&A API"
    
    # Database
    SQLALCHEMY_DATABASE_URL: str = os.getenv("SQLALCHEMY_DATABASE_URL")
    
    # API Keys
    GOOGLE_API_KEY: str = os.getenv("GEMINI_API_KEY")
    
    class Config:
        case_sensitive = True

settings = Settings()
