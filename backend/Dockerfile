# 1. Base Image:
# Using Python 3.9 as a common, stable version. You can change to 3.10 or 3.11 if preferred.
FROM python:3.9-slim

# 2. Set Environment Variables (Optional but good practice):
# Prevents Python from writing .pyc files to disc (improves performance on some filesystems)
ENV PYTHONDONTWRITEBYTECODE 1
# Ensures Python output is sent straight to terminal (making
# it easier to see logs in Cloud Run)
ENV PYTHONUNBUFFERED 1

# 3. Set Working Directory:
# This is where your code will live inside the container
WORKDIR /app

# 4. Copy requirements.txt first:
# This allows Docker to cache the installed packages layer if requirements.txt doesn't change
COPY requirements.txt .

# 5. Install Dependencies:
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy Your Application Code:
# This copies everything from your 'backend' directory (where Dockerfile is)
# into the /app directory in the container.
# So, your 'backend/app/' folder will become '/app/app/' inside the container.
COPY . .

# 7. Expose Port (Informational for Docker, Cloud Run uses $PORT):
# The Gunicorn command below will bind to the $PORT variable provided by Cloud Run.
EXPOSE 8080

# 8. Command to Run Your Application:
# - "-w 4": Specifies 4 worker processes. Adjust based on your expected load and Cloud Run instance CPU.
# - "-k uvicorn.workers.UvicornWorker": Tells Gunicorn to use Uvicorn for ASGI (FastAPI).
# - "app.main:app": This is the crucial part.
#   - Since your WORKDIR is /app and you COPY . ., your 'backend/app/' directory
#     becomes '/app/app/' in the container.
#   - Python will see an 'app' package (from the '/app/app/' directory)
#     containing a 'main.py' module, with the FastAPI instance 'app'.
# - "--bind 0.0.0.0:$PORT": Gunicorn listens on all interfaces on the port
#   specified by the $PORT environment variable (provided by Cloud Run).
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:$PORT"]