FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY backend/ backend/
COPY frontend/ frontend/
COPY .env .env  # ✅ THIS LINE IS IMPORTANT

# Expose Flask port
EXPOSE 10000

# Set environment variables
ENV FLASK_APP=backend/app.py
ENV FLASK_RUN_PORT=10000
ENV FLASK_ENV=production

# Use Gunicorn as production server
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "backend.app:app"]
