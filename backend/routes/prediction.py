from fastapi import APIRouter

from schemas.prediction import (
    PredictionRequest,
    PredictionResponse
)

from prediction.predict import predict_mental_health


router = APIRouter(
    prefix="/api",
    tags=["Prediction"]
)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(data: PredictionRequest):

    score = predict_mental_health(
        age=data.age,
        gender=data.gender,
        country=data.country,
        academic_level=data.academic_level,
        most_used_platform=data.most_used_platform,
        purpose_of_use=data.purpose_of_use,
        avg_daily_usage_hours=data.avg_daily_usage_hours,
        daily_unlocks=data.daily_unlocks,
        study_hours=data.study_hours,
        physical_activity_hours=data.physical_activity_hours,
        sleep_hours_per_night=data.sleep_hours_per_night
    )

    return {
        "mental_health_score": round(score, 2)
    }