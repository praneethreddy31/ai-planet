# Use Python 3.11 as the base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set non-sensitive environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
# requirements.txt is in the root of your 'backend' context
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Fallback (ensure requirements.txt is primary)
# Consider removing this if requirements.txt is always present and complete
RUN if [ ! -f requirements.txt ]; then \
    pip install --no-cache-dir fastapi uvicorn sqlalchemy psycopg2-binary \
    python-multipart pydantic google-generativeai python-dotenv pdfplumber; \
    fi

# Copy application code from your local 'app' directory
COPY ./app/ /app/

# Add this line to see the file structure during the build
RUN echo "---- Listing /app contents ----" && ls -R /app && echo "---- End of /app contents ----"

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Command to run the application
# Now that main.py is directly in /app, the target is 'main:app'
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]