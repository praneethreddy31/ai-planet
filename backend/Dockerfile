# Use Python 3.11 as the base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set non-sensitive environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# If requirements.txt doesn't exist, use these common packages
RUN if [ ! -f requirements.txt ]; then \
    pip install --no-cache-dir fastapi uvicorn sqlalchemy psycopg2-binary \
    python-multipart pydantic google-generativeai python-dotenv pdfplumber; \
    fi

# Copy application code
COPY ./app /app/

# Expose the port the app runs on
EXPOSE 8000

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Command to run the application - adjust this to your actual entry point
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
