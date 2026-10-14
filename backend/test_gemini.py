from google import genai
from google.genai import types
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

print("Sending request...")

response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents="Say hello in one short sentence.",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(
            thinking_level="low"
        )
    ),
)

print("RESPONSE:")
print(response.text)