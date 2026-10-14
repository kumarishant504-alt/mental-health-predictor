import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "mental_health_pipeline.pkl"
)

COUNTRY_PATH = os.path.join(
    BASE_DIR,
    "models",
    "common_countries.pkl"
)


model_pipeline = joblib.load(MODEL_PATH)
common_countries = joblib.load(COUNTRY_PATH)


def predict_mental_health(
    age,
    gender,
    country,
    academic_level,
    most_used_platform,
    purpose_of_use,
    avg_daily_usage_hours,
    daily_unlocks,
    study_hours,
    physical_activity_hours,
    sleep_hours_per_night
):

    if country not in common_countries:
        country = "Other"

    input_data = pd.DataFrame([{
        "Age": age,
        "Gender": gender,
        "Country": country,
        "Academic_Level": academic_level,
        "Most_Used_Platform": most_used_platform,
        "Purpose_Of_Use": purpose_of_use,
        "Avg_Daily_Usage_Hours": avg_daily_usage_hours,
        "Daily_Unlocks": daily_unlocks,
        "Study_Hours": study_hours,
        "Physical_Activity_Hours": physical_activity_hours,
        "Sleep_Hours_Per_Night": sleep_hours_per_night
    }])

    prediction = model_pipeline.predict(input_data)[0]

    return float(prediction)