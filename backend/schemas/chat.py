from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    assessment: dict | None = None


class ChatResponse(BaseModel):
    response: str