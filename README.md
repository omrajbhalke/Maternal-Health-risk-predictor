# Maternal Health Risk Predictor 🩺

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-2.0+-green.svg)
![MongoDB](https://img.shields.io/badge/mongodb-atlas-green.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

A full-stack machine learning web application that predicts **maternal health risk levels** as either **Healthy (Low Risk)** or **Risky (High Risk)** based on vital signs including age, blood pressure, blood sugar, body temperature, and heart rate.
- **Live Demo**: [Maternal Health Risk Predictor](maternal-health-qq5f.onrender.com)

## 🔍 Overview

This application empowers healthcare professionals and users to assess maternal health risks through an intelligent prediction system. Built with a modern tech stack, it combines machine learning accuracy with user-friendly interfaces to provide actionable health insights.

### Key Features
- 🤖 **AI-Powered Predictions**: 97% accuracy using XGBoost ensemble model
- 📊 **Interactive Dashboard**: Real-time charts and patient analytics
- 🏥 **Patient Management**: Store and track patient records
- 📱 **Responsive Design**: Works seamlessly across devices
- 🔒 **Secure Data Storage**: MongoDB Atlas integration
- 🚀 **Production Ready**: Dockerized with CI/CD pipeline

## 📁 Project Structure

```
MATERNAL-HEALTH-RISK-PREDICTOR/
├── backend/                    # Flask backend with ML model and API
│   ├── __pycache__/           # Python cache directory
│   ├── .env                   # Environment variables (MongoDB URI, etc.)
│   ├── app.py                 # Main Flask application
│   ├── ensemble_model.pkl     # Trained XGBoost ensemble model
│   ├── label_encoder.pkl      # Label encoder for target classes
│   └── scaler.pkl             # Feature scaler for preprocessing
├── frontend/                   # Static frontend files
│   ├── favicon_io/            # Favicon assets
│   ├── tips/                  # AI-generated health tips and images
│   ├── charts.js              # Chart rendering and data visualization
│   ├── favicon.png            # Website favicon
│   ├── Gemini_Generated_Image_5qx4m15qx4m15qx4.png  # AI-generated assets
│   ├── health.html            # Health tips and educational content
│   ├── health.js              # Health page JavaScript functionality
│   ├── index.html             # Landing page
│   ├── patients.html          # Patient dashboard and records
│   ├── predict.html           # Prediction input form
│   ├── script.js              # Main JavaScript for API interactions
│   ├── site.webmanifest       # Progressive Web App manifest
│   └── style.css              # Main stylesheet
├── tests/                     # Test files directory
├── .gitignore                 # Git ignore rules
├── coverage.xml               # Test coverage report
├── Dockerfile                 # Container configuration
├── Jenkinsfile                # CI/CD pipeline automation
├── README.md                  # Project documentation
└── requirements.txt           # Python dependencies
```

## 🧠 Machine Learning Model

### Input Features
- **Age**: Patient's age in years
- **Systolic BP**: Systolic blood pressure (mmHg)
- **Diastolic BP**: Diastolic blood pressure (mmHg)
- **Blood Sugar**: Blood glucose level (mmol/L)
- **Body Temperature**: Core body temperature (°F)
- **Heart Rate**: Heart rate (beats per minute)

### Target Classification
- **0**: Healthy (Low Risk) - Normal maternal health indicators
- **1**: Risky (High Risk) - Elevated risk requiring medical attention

### Model Performance
Our ensemble approach evaluated multiple algorithms:

| Algorithm | Accuracy | Status |
|-----------|----------|---------|
| **XGBoost** | **97%** | ✅ **Selected** |
| Random Forest | 94% | Evaluated |
| Gradient Boosting | 93% | Evaluated |
| AdaBoost | 91% | Evaluated |
| Logistic Regression | 89% | Evaluated |
| SVM | 87% | Evaluated |
| KNN | 85% | Evaluated |
| Extra Trees | 92% | Evaluated |
| Decision Tree | 83% | Evaluated |

### Model Optimization
- **GridSearchCV** for hyperparameter tuning
- **Class balancing** using `scale_pos_weight` to handle imbalanced data
- **Cross-validation** for robust performance evaluation
- **Feature scaling** using StandardScaler for optimal performance

## 🌐 Frontend Architecture

### Pages & Functionality
- **`index.html`**: Welcome page with project overview and navigation
- **`predict.html`**: Interactive prediction form with real-time validation
- **`patients.html`**: Patient dashboard with analytics and historical data
- **`health.html`**: Educational content and health tips with visualizations

### Technical Stack
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Dynamic interactions and API communication
- **Chart.js**: Interactive data visualizations
- **Progressive Web App**: Offline capabilities and mobile optimization

## 🔧 Backend Architecture

### Flask Application (`app.py`)
- **RESTful API** endpoints for predictions and data management
- **Model loading** and inference pipeline
- **MongoDB integration** for patient record storage
- **CORS enabled** for cross-origin requests
- **Error handling** and input validation

### API Endpoints
```python
POST /predict          # Submit health data for risk prediction
GET /patients          # Retrieve patient records
POST /patients         # Store new patient record
GET /health-stats      # Get aggregated health statistics
```

### Database Schema (MongoDB)
```json
{
  "_id": "ObjectId",
  "age": "Number",
  "systolic_bp": "Number",
  "diastolic_bp": "Number",
  "blood_sugar": "Number",
  "body_temperature": "Number",
  "heart_rate": "Number",
  "risk_level": "String",
  "prediction_confidence": "Number",
  "timestamp": "Date",
  "patient_id": "String"
}
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- MongoDB Atlas account (free tier available)
- Docker (optional, for containerized deployment)
- Modern web browser

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/MATERNAL-HEALTH-RISK-PREDICTOR.git
   cd MATERNAL-HEALTH-RISK-PREDICTOR
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/maternal_health
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   ```

5. **Run the application**
   ```bash
   cd backend
   python app.py
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t maternal-health-predictor .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 --env-file backend/.env maternal-health-predictor
   ```

3. **Access the application**
   Navigate to `http://localhost:5000`

## 📊 Usage Examples

### Making a Prediction
```javascript
// Example API call from frontend
const predictionData = {
  age: 25,
  systolic_bp: 120,
  diastolic_bp: 80,
  blood_sugar: 8.0,
  body_temperature: 98.6,
  heart_rate: 72
};

fetch('/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(predictionData)
})
.then(response => response.json())
.then(data => {
  console.log('Prediction:', data.prediction);
  console.log('Confidence:', data.confidence);
});
```

### Sample Response
```json
{
  "prediction": "Healthy",
  "risk_level": 0,
  "confidence": 0.89,
  "recommendations": [
    "Maintain regular prenatal checkups",
    "Continue current healthy lifestyle",
    "Monitor blood pressure regularly"
  ]
}
```

## 📈 Monitoring & Analytics

### Health Statistics Dashboard
The application provides comprehensive analytics including:
- **Risk Distribution**: Percentage of high-risk vs. low-risk predictions
- **Vital Signs Trends**: Historical analysis of patient vitals
- **Age Demographics**: Risk patterns across different age groups
- **Prediction Confidence**: Model reliability metrics

### Real-time Monitoring
- **Patient Records**: Track individual patient journeys
- **Prediction Accuracy**: Monitor model performance over time
- **System Health**: API response times and error rates

## 🔒 Security & Privacy

### Data Protection
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Comprehensive data sanitization
- **HTTPS Ready**: SSL/TLS encryption support
- **Database Security**: MongoDB Atlas enterprise security

### Privacy Compliance
- **Anonymous Predictions**: No personally identifiable information required
- **Data Minimization**: Only essential health metrics collected
- **Secure Storage**: Encrypted data transmission and storage

## 🧪 Testing

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests with coverage
pytest --cov=backend tests/

# Generate coverage report
pytest --cov=backend --cov-report=html tests/
```

### Test Coverage
- **Unit Tests**: Model prediction accuracy
- **Integration Tests**: API endpoint functionality
- **Frontend Tests**: User interface interactions
- **Performance Tests**: Load testing for scalability

## 🚀 Deployment

### Production Deployment Options

#### 1. Render (Recommended)
```bash
# Connect your GitHub repo to Render
# Set environment variables in Render dashboard
# Deploy automatically on git push
```

#### 2. Heroku
```bash
# Install Heroku CLI
heroku create maternal-health-app
heroku config:set MONGO_URI="your-mongodb-uri"
git push heroku main
```

#### 3. AWS/GCP/Azure
- Use the provided `Dockerfile` for containerized deployment
- Configure environment variables in cloud provider settings
- Set up load balancing and auto-scaling as needed

### CI/CD Pipeline
The `Jenkinsfile` provides automated:
- **Code Quality Checks**: Linting and formatting
- **Automated Testing**: Unit and integration tests
- **Security Scanning**: Vulnerability assessment
- **Deployment**: Automated production deployment

## 📚 API Documentation

### Endpoints

#### POST /predict
Predict maternal health risk based on vital signs.

**Request Body:**
```json
{
  "age": 25,
  "systolic_bp": 120,
  "diastolic_bp": 80,
  "blood_sugar": 8.0,
  "body_temperature": 98.6,
  "heart_rate": 72
}
```

**Response:**
```json
{
  "prediction": "Healthy",
  "risk_level": 0,
  "confidence": 0.89,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### GET /patients
Retrieve patient records with pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Records per page (default: 10)
- `risk_level`: Filter by risk level (optional)

#### POST /patients
Store a new patient record.

**Request Body:**
```json
{
  "patient_id": "P001",
  "age": 25,
  "vitals": { /* vital signs */ },
  "prediction": "Healthy"
}
```

## 🔧 Configuration

### Environment Variables
```env
# Database
MONGO_URI=mongodb+srv://...
DB_NAME=maternal_health

# Flask
FLASK_ENV=production
SECRET_KEY=your-secret-key

# Security
CORS_ORIGINS=*
MAX_CONTENT_LENGTH=16777216

# Logging
LOG_LEVEL=INFO
```

### Model Configuration
```python
# Model hyperparameters
XGBOOST_PARAMS = {
    'n_estimators': 100,
    'max_depth': 6,
    'learning_rate': 0.1,
    'subsample': 0.8,
    'colsample_bytree': 0.8
}
```

## 📱 Mobile & Progressive Web App

### PWA Features
- **Offline Capability**: Cache predictions and data
- **Install Prompt**: Add to home screen
- **Push Notifications**: Health reminders (optional)
- **Responsive Design**: Optimized for all screen sizes

### Mobile Optimization
- **Touch-Friendly UI**: Large buttons and inputs
- **Fast Loading**: Optimized assets and lazy loading
- **Gestures**: Swipe navigation and interactions

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pytest tests/`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards
- **Python**: Follow PEP 8 style guide
- **JavaScript**: Use ES6+ features and consistent formatting
- **HTML/CSS**: Semantic markup and mobile-first design
- **Documentation**: Update README and code comments

### Issue Reporting
- Use GitHub Issues for bug reports and feature requests
- Provide detailed reproduction steps
- Include environment information and error logs

## 📈 Future Enhancements

### Short-term Goals
- [ ] **User Authentication**: Login/logout functionality
- [ ] **Data Export**: PDF reports and CSV downloads
- [ ] **Email Notifications**: Automated health alerts
- [ ] **Multi-language Support**: Internationalization

### Long-term Vision
- [ ] **Real-time Monitoring**: IoT device integration
- [ ] **Advanced Analytics**: Predictive trends and insights
- [ ] **Mobile Apps**: Native iOS and Android applications
- [ ] **AI Chatbot**: Health consultation assistant
- [ ] **Telemedicine Integration**: Video consultations

## 🏆 Acknowledgments

### Data Sources
- **Kaggle**: Maternal Health Risk Data Dataset
- **UCI ML Repository**: Additional health datasets
- **Medical Literature**: Clinical validation references

### Technologies
- **Machine Learning**: Scikit-learn, XGBoost, Pandas, NumPy
- **Backend**: Flask, PyMongo, Gunicorn
- **Frontend**: Chart.js, Progressive Web App APIs
- **DevOps**: Docker, Jenkins, GitHub Actions
- **Cloud**: MongoDB Atlas, Render, AWS

### Special Thanks
- **Healthcare Professionals**: Domain expertise and validation
- **Open Source Community**: Tools and libraries
- **AI/ML Community**: Research and best practices

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Maternal Health Risk Predictor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

- **Email**: omrajbhalke245@gmail.com
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/omraj-bhalke-94408a259/)

### Support the Project
If you find this project helpful, please consider:
- ⭐ **Star the repository** on GitHub
- 🐛 **Report issues** to improve the project
- 🔀 **Contribute code** or documentation
- 📢 **Share** with healthcare professionals and developers

---

*Made with ❤️ for maternal health and AI-powered healthcare solutions*
