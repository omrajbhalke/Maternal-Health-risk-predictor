FROM python:3.11-slim-bullseye

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libssl-dev \
    curl \
    openssl \
    ca-certificates \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/app.py .
COPY backend/ensemble_model.pkl .
COPY backend/scaler.pkl .
COPY backend/label_encoder.pkl .

# Copy frontend folder
COPY frontend/ frontend/

# Expose the app port
EXPOSE 10000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_PORT=10000
ENV FLASK_ENV=production

# Launch using Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "app:app"]
