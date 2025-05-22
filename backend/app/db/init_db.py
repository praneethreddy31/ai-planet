# app/db/init_db.py
from sqlalchemy.orm import Session

from app.db.models import Base
from app.db.database import engine, SessionLocal

def init_db():
    """Initialize the database by creating all tables."""
    Base.metadata.create_all(bind=engine)
    
    # You can add seed data here if needed
    # with SessionLocal() as db:
    #     create_initial_data(db)
    
    return {"message": "Database initialized successfully"}

# Optional: Function to create initial seed data
# def create_initial_data(db: Session):
#     # Add any initial records you need
#     pass
