from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your actual database URL or use a config file
SQLALCHEMY_DATABASE_URL = "postgresql://neondb_owner:npg_4nSQUO9wkNRM@ep-jolly-violet-a516qkf8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():  # <--- HERE IT IS!
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    # Import the models here to ensure they are registered with Base
    from app.db.models import Document, Question # This implies app.db.models.py should exist
    Base.metadata.create_all(bind=engine)