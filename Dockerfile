FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files individually
COPY backend/app.py .
COPY backend/ensemble_model.pkl .
COPY backend/scaler.pkl .
COPY backend/label_encoder.pkl .

# Copy frontend folder (optional, for static file serving)
COPY frontend/ frontend/

# Expose the port the app runs on
EXPOSE 10000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_PORT=10000
ENV FLASK_ENV=production

# Start using Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:10000", "app:app"]
