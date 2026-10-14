from pydantic import BaseModel


class PredictionRequest(BaseModel):
    age: int
    gender: str
    country: str
    academic_level: str
    most_used_platform: str
    purpose_of_use: str
    avg_daily_usage_hours: float
    daily_unlocks: int
    study_hours: float
    physical_activity_hours: float
    sleep_hours_per_night: float


class PredictionResponse(BaseModel):
    mental_health_score: float