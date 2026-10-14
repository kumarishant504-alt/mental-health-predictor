from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.prediction import router as prediction_router
from routes.chat import router as chat_router


app = FastAPI(
    title="Mental Health Predictor API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(prediction_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "Mental Health Predictor API is running"
    }