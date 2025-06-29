// Health Risk Prediction Frontend - Enhanced Version

// Safe ranges for health parameters
const SAFE_RANGES = {
    age: { min: 15, max: 80, unit: "years", normal: "15-80" },
    diastolic: { min: 40, max: 115, unit: "mmHg", normal: "60-80" },
    bs: { min: 3.3, max: 11.1, unit: "mmol/L", normal: "3.9-5.5" },
    temp: { min: 95, max: 105, unit: "°F", normal: "97.8-99.1" },
    pulse: { min: 40, max: 180, unit: "bpm", normal: "60-100" }
};

const isValidNumber = (val, min, max) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= min && num <= max;
};

// Function to generate detailed health report
function generateHealthReport(data, riskResult) {
    const reportHTML = `
        <div class="health-report">
            <h3>Health Assessment Report</h3>
            <div class="patient-info">
                <strong>Patient:</strong> ${data.name}
            </div>
            
            <div class="risk-assessment">
                <strong>Risk Assessment:</strong> 
                <span class="${riskResult === 'Risky' ? 'risk-high' : 'risk-low'}">
                    ${riskResult === 'Risky' ? '🔴 HIGH RISK' : '🟢 LOW RISK'}
                </span>
            </div>

            <div class="measurements">
                <h4>Current Measurements vs Safe Ranges</h4>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Your Value</th>
                            <th>Safe Range</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Age</td>
                            <td>${data.age} ${SAFE_RANGES.age.unit}</td>
                            <td>${SAFE_RANGES.age.normal} ${SAFE_RANGES.age.unit}</td>
                            <td>${getParameterStatus(data.age, 15, 80)}</td>
                        </tr>
                        <tr>
                            <td>Diastolic BP</td>
                            <td>${data.diastolic} ${SAFE_RANGES.diastolic.unit}</td>
                            <td>${SAFE_RANGES.diastolic.normal} ${SAFE_RANGES.diastolic.unit}</td>
                            <td>${getParameterStatus(data.diastolic, 60, 80)}</td>
                        </tr>
                        <tr>
                            <td>Blood Sugar</td>
                            <td>${data.bs} ${SAFE_RANGES.bs.unit}</td>
                            <td>${SAFE_RANGES.bs.normal} ${SAFE_RANGES.bs.unit}</td>
                            <td>${getParameterStatus(data.bs, 3.9, 5.5)}</td>
                        </tr>
                        <tr>
                            <td>Body Temperature</td>
                            <td>${data.temp} ${SAFE_RANGES.temp.unit}</td>
                            <td>${SAFE_RANGES.temp.normal} ${SAFE_RANGES.temp.unit}</td>
                            <td>${getParameterStatus(data.temp, 97.8, 99.1)}</td>
                        </tr>
                        <tr>
                            <td>Pulse Rate</td>
                            <td>${data.pulse} ${SAFE_RANGES.pulse.unit}</td>
                            <td>${SAFE_RANGES.pulse.normal} ${SAFE_RANGES.pulse.unit}</td>
                            <td>${getParameterStatus(data.pulse, 60, 100)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="recommendations">
                <h4>Health Recommendations</h4>
                ${generateRecommendations(data, riskResult)}
            </div>

            <div class="report-footer">
                <small>This is an AI-based prediction for informational purposes only. Please consult a healthcare professional for proper medical advice.</small>
            </div>
        </div>
    `;
    
    return reportHTML;
}

// Function to determine parameter status
function getParameterStatus(value, normalMin, normalMax) {
    if (value >= normalMin && value <= normalMax) {
        return '<span class="status-normal">Normal</span>';
    } else if (value < normalMin) {
        return '<span class="status-low">Low</span>';
    } else {
        return '<span class="status-high">High</span>';
    }
}

// Function to generate health recommendations
function generateRecommendations(data, riskResult) {
    let recommendations = [];
    
    if (riskResult === 'Risky') {
        recommendations.push("<strong>Immediate attention recommended</strong> - Please consult a healthcare provider");
    }
    
    // Check individual parameters and add specific recommendations
    if (data.diastolic > 80) {
        recommendations.push("Monitor blood pressure regularly and consider lifestyle changes");
    }
    if (data.bs > 5.5) {
        recommendations.push("Monitor blood sugar levels and maintain a balanced diet");
    }
    if (data.temp > 99.1) {
        recommendations.push("Monitor body temperature and stay hydrated");
    }
    if (data.pulse > 100) {
        recommendations.push("Monitor heart rate and consider stress management techniques");
    }
    
    if (recommendations.length === 0) {
        recommendations.push("All parameters appear within acceptable ranges. Maintain healthy lifestyle habits.");
    }
    
    return recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('');
}

function predict() {
    const predictButton = document.getElementById("predictButton");
    const resultDiv = document.getElementById("result");

    // ✅ Disable button immediately
    predictButton.disabled = true;
    predictButton.innerText = "Predicting...";
    
    // Clear previous results
    resultDiv.innerHTML = "";

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const diastolic = document.getElementById("diastolic").value;
    const bs = document.getElementById("bs").value;
    const temp = document.getElementById("temp").value;
    const pulse = document.getElementById("pulse").value;

    if (!name || !age || !diastolic || !bs || !temp || !pulse) {
        alert("Please fill all fields");
        predictButton.disabled = false;
        predictButton.innerText = "Predict";
        return;
    }

    if (
        !isValidNumber(age, 15, 80) ||
        !isValidNumber(diastolic, 40, 115) ||
        !isValidNumber(bs, 3.3, 11.1) ||
        !isValidNumber(temp, 95, 105) ||
        !isValidNumber(pulse, 40, 180)
    ) {
        resultDiv.innerHTML = "<div class='error-message'>⚠️ Please enter valid values in all fields.</div>";
        predictButton.disabled = false;
        predictButton.innerText = "Predict";
        return;
    }

    const data = {
        name: name,
        age: parseFloat(age),
        diastolic: parseFloat(diastolic),
        bs: parseFloat(bs),
        temp: parseFloat(temp),
        pulse: parseFloat(pulse)
    };

    fetch("https://maternal-health-qq5f.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => {
            if (result.risk) {
                // Display detailed prediction result with report and action buttons
                const reportHTML = generateHealthReportWithActions(data, result.risk);
                resultDiv.innerHTML = reportHTML;
                
                console.log(`Prediction for ${name}: ${result.risk}`);
                
                // ✅ Clear form fields
                clearForm();
            } else if (result.error) {
                resultDiv.innerHTML = "<div class='error-message'>⚠️ Error: " + result.error + "</div>";
            } else {
                resultDiv.innerHTML = "<div class='error-message'>⚠️ Unknown error occurred.</div>";
            }
        })
        .catch(err => {
            console.error("Prediction error:", err);
            
            // Show user-friendly error message
            let errorHTML = "";
            if (err.message.includes("Failed to fetch")) {
                errorHTML = `
                    <div class="error-message">
                        <h3>Connection Error</h3>
                        <p>Cannot connect to backend server.</p>
                        <p>Please check your internet connection and try again.</p>
                    </div>
                `;
            } else {
                errorHTML = `
                    <div class="error-message">
                        <h3>Prediction Failed</h3>
                        <p>An error occurred during prediction. Please try again.</p>
                    </div>
                `;
            }
            
            resultDiv.innerHTML = errorHTML;
            alert("Prediction failed. Please check your connection and try again.");
        })
        .finally(() => {
            // ✅ Always re-enable button
            predictButton.disabled = false;
            predictButton.innerText = "Predict";
        });
}

// Helper function to clear form fields
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("diastolic").value = "";
    document.getElementById("bs").value = "";
    document.getElementById("temp").value = "";
    document.getElementById("pulse").value = "";
}

// Optional: Function to load patient data (if you have a dashboard)
function loadPatients() {
    fetch("https://maternal-health-qq5f.onrender.com/patients")
    .then(response => response.json())
    .then(data => {
        console.log("Patient data loaded:", data);
        // You can update UI with patient statistics here
    })
    .catch(error => {
        console.error("Error loading patients:", error);
    });
}

// Optional: Test backend connection
function testBackendConnection() {
    fetch("https://maternal-health-qq5f.onrender.com/health")
    .then(response => response.json())
    .then(data => {
        console.log("Backend connection successful:", data);
    })
    .catch(error => {
        console.error("Backend connection failed:", error);
        console.log("Backend may be starting up. This is normal for cloud deployments.");
    });
}

// Print Report Functionality
function printReport() {
    const reportElement = document.querySelector('.health-report');
    if (!reportElement) {
        alert('No health report available to print. Please run a prediction first.');
        return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get the CSS styles
    const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
            try {
                return Array.from(styleSheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
            } catch (e) {
                return '';
            }
        })
        .join('\n');

    // Write the content to the new window
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Health Risk Assessment Report</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                ${styles}
                body { font-family: 'Poppins', sans-serif; margin: 20px; }
                .download-pdf-btn { display: none !important; }
                @media print {
                    .download-pdf-btn { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${reportElement.outerHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// Enhanced report generation with action buttons
function generateHealthReportWithActions(data, riskResult) {
    const reportHTML = `
        <div class="health-report">
            <div class="report-actions">
                <button onclick="printReport()" class="action-btn print-btn">🖨️ Print Report</button>
            </div>
            
            <h3>Health Assessment Report</h3>
            <div class="patient-info">
                <strong>Patient:</strong> ${data.name}
            </div>
            
            <div class="risk-assessment">
                <strong>Risk Assessment:</strong> 
                <span class="${riskResult === 'Risky' ? 'risk-high' : 'risk-low'}">
                    ${riskResult === 'Risky' ? '🔴 HIGH RISK' : '🟢 LOW RISK'}
                </span>
            </div>

            <div class="measurements">
                <h4>Current Measurements vs Safe Ranges</h4>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Your Value</th>
                            <th>Safe Range</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Age</td>
                            <td>${data.age} ${SAFE_RANGES.age.unit}</td>
                            <td>${SAFE_RANGES.age.normal} ${SAFE_RANGES.age.unit}</td>
                            <td>${getParameterStatus(data.age, 15, 80)}</td>
                        </tr>
                        <tr>
                            <td>Diastolic BP</td>
                            <td>${data.diastolic} ${SAFE_RANGES.diastolic.unit}</td>
                            <td>${SAFE_RANGES.diastolic.normal} ${SAFE_RANGES.diastolic.unit}</td>
                            <td>${getParameterStatus(data.diastolic, 60, 80)}</td>
                        </tr>
                        <tr>
                            <td>Blood Sugar</td>
                            <td>${data.bs} ${SAFE_RANGES.bs.unit}</td>
                            <td>${SAFE_RANGES.bs.normal} ${SAFE_RANGES.bs.unit}</td>
                            <td>${getParameterStatus(data.bs, 3.9, 5.5)}</td>
                        </tr>
                        <tr>
                            <td>Body Temperature</td>
                            <td>${data.temp} ${SAFE_RANGES.temp.unit}</td>
                            <td>${SAFE_RANGES.temp.normal} ${SAFE_RANGES.temp.unit}</td>
                            <td>${getParameterStatus(data.temp, 97.8, 99.1)}</td>
                        </tr>
                        <tr>
                            <td>Pulse Rate</td>
                            <td>${data.pulse} ${SAFE_RANGES.pulse.unit}</td>
                            <td>${SAFE_RANGES.pulse.normal} ${SAFE_RANGES.pulse.unit}</td>
                            <td>${getParameterStatus(data.pulse, 60, 100)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="recommendations">
                <h4>Health Recommendations</h4>
                ${generateRecommendations(data, riskResult)}
            </div>

            <div class="report-footer">
                <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                <small>This is an AI-based prediction for informational purposes only. Please consult a healthcare professional for proper medical advice.</small>
            </div>
        </div>
    `;
    
    return reportHTML;
}

// Test connection when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Frontend loaded. Testing backend connection...");
    testBackendConnection();
    
    // Load html2pdf library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function() {
        console.log('html2pdf library loaded successfully');
    };
    script.onerror = function() {
        console.error('Failed to load html2pdf library');
    };
    document.head.appendChild(script);
});