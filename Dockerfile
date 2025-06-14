# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy dependency file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ ./backend
COPY tests/ ./tests

# Expose the port your app runs on (if needed)
EXPOSE 5000

# Run the app
CMD ["python", "backend/app.py"]
