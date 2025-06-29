# # cd backend
# # pip install flask flask-cors joblib
# # python app.py

# # cd frontend
# # python -m http.server 8000
# # http://localhost:8000

# # net start MongoDB

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import certifi
from pymongo import MongoClient
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Load the trained model and preprocessors
# model = joblib.load("ensemble_model.pkl")
# scaler = joblib.load("scaler.pkl")
# label_encoder = joblib.load("label_encoder.pkl")  # Trained with ['Healthy', 'Risky']

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "ensemble_model.pkl"))
encoder = joblib.load(os.path.join(BASE_DIR, "label_encoder.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

# Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# from dotenv import load_dotenv

# load_dotenv()  # Load variables from .env

# MONGO_URL = os.getenv("MONGO_URL")
# MONGO_URL= "mongodb+srv://maternal2:Uu61Fk1L88ONcoUM@m0.pinfoio.mongodb.net/health_db?retryWrites=true&w=majority&tls=true&appName=M0"

# client = MongoClient(MONGO_URL, tlsCAFile=certifi.where())


from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://maternal2:Uu61Fk1L88ONcoUM@m0.pinfoio.mongodb.net/?retryWrites=true&w=majority&appName=M0"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# db = client["health_db"]
# collection = db["patients"]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Extract fields
        name = data["name"]
        age = float(data["age"])
        diastolic = float(data["diastolic"])
        bs = float(data["bs"])
        temp = float(data["temp"])
        pulse = float(data["pulse"])

        # Preprocess and predict
        input_data = [age, diastolic, bs, temp, pulse]
        input_scaled = scaler.transform([input_data])
        prediction = model.predict(input_scaled)
        risk_label = encoder.inverse_transform(prediction)[0]

        # Store in MongoDB
        collection.insert_one({
            "name": name,
            "age": age,
            "diastolic": diastolic,
            "bs": bs,
            "temp": temp,
            "pulse": pulse,
            "risk": risk_label,
            "timestamp": datetime.now()
        })

        return jsonify({"risk": risk_label})
    
    except Exception as e:
        print("🔥 Prediction error:", repr(e))  # <--- Add this line
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 400


@app.route('/patients', methods=['GET'])
def get_patients():
    try:
        # Fetch all patient records
        patients = list(collection.find({}, {'_id': 0}))
        total = len(patients)

        # Count Healthy vs Risky
        risk_counts = {"Healthy": 0, "Risky": 0}
        for p in patients:
            risk = p.get('risk', 'Unknown')
            if risk in risk_counts:
                risk_counts[risk] += 1

        return jsonify({
            "total": total,
            "riskCounts": risk_counts,
            "patients": patients
        })

    except Exception as e:
        print("Error fetching patients:", e)
        return jsonify({"error": "Failed to fetch patient data"}), 500
    
# Serve frontend
# FRONTEND_DIR = os.path.join(os.path.dirname(__file__), '..', 'frontend')
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), 'frontend')


@app.route('/')
def serve_index():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(FRONTEND_DIR, path)

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=10000)
    # app.run(host='0.0.0.0', port=5000, debug=True)

