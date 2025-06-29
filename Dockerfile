FROM python:3.11-slim

# Step 1: Install system dependencies for SSL/TLS
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libssl-dev \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 4: Copy backend files
COPY backend/app.py .
COPY backend/ensemble_model.pkl .
COPY backend/scaler.pkl .
COPY backend/label_encoder.pkl .

# Step 5: Copy frontend folder (optional)
COPY frontend/ frontend/

# Step 6: Expose the port
EXPOSE 10000

# Step 7: Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_PORT=10000
ENV FLASK_ENV=production

# Step 8: Run using Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "app:app"]
