# 🧠 MENTAL HEALTH PREDICTOR

### AI-Powered Wellness Assessment & Lifestyle Insights

**MENTAL HEALTH PREDICTOR** is a machine learning–based web application that estimates a user's wellness score from daily lifestyle patterns, including sleep, screen time, study habits, physical activity, and digital usage. It combines predictive analytics with personalized wellness recommendations and an AI-powered chatbot to help users reflect on their daily routines.

The project integrates a trained **Extra Trees Regression model**, a **FastAPI backend**, and a **React frontend** to provide an interactive assessment experience.

> **Disclaimer:** This is an educational machine learning project, not a clinically validated mental health assessment or diagnostic tool. Its predictions and recommendations are not a substitute for professional care.

---

## ✨ Key Features

- **📊 Wellness Score Prediction** — Estimates a wellness score on a 0–10 scale using lifestyle-related inputs.
- **🧠 Machine Learning Integration** — Uses an Extra Trees Regression model with a preprocessing pipeline.
- **😌 Stress-Level Insight** — Lets users report Low, Medium, or High stress and applies a separate stress-based score adjustment.
- **📈 Assessment Analysis** — Presents the predicted score, score interpretation, and submitted lifestyle information.
- **💡 Personalized Recommendations** — Provides general suggestions related to sleep, screen usage, physical activity, study habits, nutrition, hydration, mindfulness, and relaxation.
- **🤖 AI Wellness Chatbot** — Offers conversational wellness guidance with assessment context.
- **📅 Assessment History** — Stores recent assessments locally for reviewing previous results.
- **👤 User Interface** — Includes registration, login, profile, dashboard, settings, and support pages.
- **🆘 Support Resources** — Provides support guidance and an emergency calling link.
- **📱 Responsive Dashboard** — Uses a modern interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

| Component                     | Technologies                          |
| ----------------------------- | ------------------------------------- |
| Frontend                      | React, Vite, Tailwind CSS, JavaScript |
| UI & Icons                    | Lucide React                          |
| Backend                       | Python, FastAPI, Uvicorn              |
| Machine Learning              | Scikit-learn, Extra Trees Regressor   |
| Data Processing               | Pandas, NumPy                         |
| Data Visualization & Analysis | Matplotlib, Seaborn, Jupyter Notebook |
| Model Serialization           | Joblib                                |
| AI Chatbot                    | Google Gemini API                     |
| Local Data Storage            | Browser LocalStorage                  |

---

## 🤖 Machine Learning Pipeline

The model was trained using lifestyle and digital-usage data.

### Input Features

- Age
- Gender
- Country
- Academic Level
- Most-Used Platform
- Purpose of Use
- Average Daily Usage Hours
- Daily Unlocks
- Study Hours
- Physical Activity Hours
- Sleep Hours per Night

**Stress Level is handled separately** and is not an input feature of the original trained Extra Trees model.

### Model Development

The machine learning workflow includes:

1. Data cleaning and duplicate removal.
2. Exploratory Data Analysis (EDA).
3. Numerical feature scaling.
4. Categorical feature encoding.
5. Train-test splitting.
6. Training and comparison of multiple regression models.
7. Cross-validation and model evaluation.
8. Saving the trained preprocessing and prediction pipeline.

The evaluated models included Linear Regression, Random Forest, Gradient Boosting, and Extra Trees Regression.

### Model Performance

The original Extra Trees model achieved the following results on the held-out test set:

| Metric                          | Result |
| ------------------------------- | -----: |
| Mean Absolute Error (MAE)       | 0.2236 |
| Root Mean Squared Error (RMSE)  | 0.3168 |
| R² Score                        | 0.9438 |
| Mean 5-Fold Cross-Validation R² | 0.9250 |

These results describe performance on the project's dataset. They do not establish clinical validity or guarantee accurate predictions for new users.

### Stress-Level Adjustment

The application applies a separate adjustment to the base model prediction:

| Self-Reported Stress Level | Adjustment |
| -------------------------- | ---------: |
| Low                        |      +0.30 |
| Medium                     |       0.00 |
| High                       |      −0.50 |

The adjusted score is bounded between 0 and 10.

**Important:** These adjustments are application-defined values, not learned effects from the ML model or clinically validated weights. The displayed score is therefore a combination of the model prediction and a separate rule-based adjustment.

---

## 📂 Project Structure

```text
MENTAL_HEALTH/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── prediction.py
│   │   └── chat.py
│   ├── schemas/
│   │   ├── prediction.py
│   │   └── chat.py
│   ├── services/
│   │   └── chatbot.py
│   └── prediction/
│       └── predict.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── app.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── models/
│   ├── mental_health_pipeline.pkl
│   └── common_countries.pkl
│
├── data/
│   └── raw/
│       └── mini.csv
│
├── notebooks/
│   └── 01_eda.ipynb
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Install the following before running the application:

- Python 3.10 or a compatible supported version
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/MENTAL_HEALTH.git
cd MENTAL_HEALTH
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Set Up the Python Backend

Create and activate a virtual environment from the project root.

**Windows PowerShell:**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install the required packages:

```powershell
pip install -r backend/requirements.txt
```

*(Or directly via `pip install fastapi uvicorn pandas numpy scikit-learn joblib python-dotenv google-genai`)*

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory for the Gemini API:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Verify the Model Files

Make sure the following files exist in `models/`:

```text
models/mental_health_pipeline.pkl
models/common_countries.pkl
```

### 5. Start the Backend

From the project root:

```powershell
cd backend
uvicorn main:app --reload
```

The API will run at: `http://127.0.0.1:8000`  
Interactive documentation: `http://127.0.0.1:8000/docs`

### 6. Start the Frontend

Open a **second terminal** at the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, typically: `http://localhost:5173`

---

## 🔄 Application Workflow

```text
User
 │
 ▼
React Assessment Form
 │
 ▼
FastAPI Prediction Endpoint
 │
 ▼
Saved ML Preprocessing Pipeline
 │
 ▼
Extra Trees Regression Model
 │
 ▼
Base Wellness Score
 │
 ▼
Separate Stress-Level Adjustment
 │
 ▼
Final Displayed Score
 │
 ▼
Analysis, Recommendations & Chatbot
```

---

## 🔐 Privacy & Security Notes

- Assessment history and demo account data are stored in browser LocalStorage.
- LocalStorage is intended for demonstration purposes, not secure authentication or encrypted health data.
- Do not enter sensitive personal information into a public demo.
- Keep API keys in environment variables and exclude `.env` from version control.

---

## 🚧 Limitations

- The model is trained on a specific dataset and may not generalize to every population.
- Predictions reflect patterns learned from the dataset rather than a clinical assessment.
- Stress adjustments are rule-based and are not validated clinical measures.
- Recommendations are general wellness suggestions, not personalized medical treatment.

---

## 🔮 Future Improvements

- Interactive wellness what-if simulator.
- Explainable AI (SHAP / LIME) to show feature influence on individual predictions.
- Longitudinal wellness tracking and weekly summaries.
- Production-grade authentication and encrypted database storage.
- Expanded support resources and accessibility improvements.

---

## 🎯 Project Objective

The goal of **MENTAL HEALTH PREDICTOR** is to demonstrate how machine learning, web development, and conversational AI can be combined into an interactive lifestyle-awareness application that encourages reflection on everyday habits while clearly distinguishing model predictions from professional medical care.

---

## 👨‍💻 Author

**ISHANT KUMAR**

B.Tech Computer Science & Engineering Student





