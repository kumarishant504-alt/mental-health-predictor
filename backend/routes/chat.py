from fastapi import APIRouter, HTTPException
from schemas.chat import ChatRequest, ChatResponse
from services.chatbot import generate_chat_response

router = APIRouter(prefix="/api", tags=["Chat"])


@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest):
    if not data.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty."
        )

    try:
        print("CHAT REQUEST RECEIVED")
        print("Message:", data.message)

        response = generate_chat_response(
            message=data.message,
            assessment=data.assessment,
        )

        print("GEMINI RESPONSE RECEIVED")
        print(response)

        return {"response": response}

    except Exception as error:
        print("\n========== CHATBOT ERROR ==========")
        print(type(error).__name__)
        print(str(error))
        print("===================================\n")

        raise HTTPException(
            status_code=500,
            detail=f"Gemini error: {error}",
        )