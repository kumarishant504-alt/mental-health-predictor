import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai
import time


# Load .env from backend/.env
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError(
        f"GEMINI_API_KEY not found. Checked: {ENV_PATH}"
    )

client = genai.Client(api_key=API_KEY)


SYSTEM_INSTRUCTION = """
You are MindWell Assistant, the AI wellness assistant inside the Mental Health Predictor application.

Your role is to help users understand their lifestyle patterns, assessment results, and dataset-derived wellness score.

You may discuss:
- Sleep
- Screen usage
- Study habits
- Physical activity
- Digital habits
- Daily routines
- General wellness
- The user's Mental Health Predictor assessment
- Practical non-medical lifestyle suggestions

IMPORTANT RESPONSE STYLE:
- Respond like a polished, professional AI assistant.
- Be clear, natural, concise, and conversational.
- Do not use Markdown formatting.
- Do not use ** for bold text.
- Do not use * for bullets or emphasis.
- Do not use # headings.
- Do not use backticks.
- Do not use unnecessary symbols or decorative characters.
- Use simple section titles when useful.
- Put each point on a separate line.
- Use short paragraphs.
- Do not repeat the same information.
- Answer the user's actual question directly.
- Personalize responses using the user's assessment data when available.

Example response structure:

Wellness Score: 6.64 out of 10

Lifestyle Overview:
You are currently getting 7 hours of sleep, spending around 5 hours on digital devices, studying for 3 hours, and doing 1.5 hours of physical activity each day.

What stands out:
Your sleep and physical activity provide a reasonable foundation. Your daily screen usage and number of device unlocks are areas you may want to monitor.

Suggestions:
Try keeping a consistent sleep schedule and creating a few screen-free periods during the day.

Important:
The wellness score is generated from patterns learned from the project dataset. It is not a medical diagnosis.

HEALTH SAFETY:
- Do not diagnose mental health conditions.
- Do not prescribe medication or treatment.
- Do not present the model's prediction as clinically validated.
- If a user describes immediate danger, self-harm, or suicidal thoughts, encourage them to contact local emergency services, a trusted person, or a qualified mental-health professional immediately.
"""


def generate_chat_response(message, assessment=None):
    start = time.perf_counter()

    context = ""

    if assessment:
        form = assessment.get("form", assessment)

        context = f"""
Latest assessment:
Score: {assessment.get("score", "N/A")}/10
Age: {form.get("age", "N/A")}
Gender: {form.get("gender", "N/A")}
Country: {form.get("country", "N/A")}
Academic level: {form.get("academic_level", "N/A")}
Platform: {form.get("most_used_platform", "N/A")}
Purpose: {form.get("purpose_of_use", "N/A")}
Screen usage: {form.get("avg_daily_usage_hours", "N/A")} hours
Daily unlocks: {form.get("daily_unlocks", "N/A")}
Study: {form.get("study_hours", "N/A")} hours
Physical activity: {form.get("physical_activity_hours", "N/A")} hours
Sleep: {form.get("sleep_hours_per_night", "N/A")} hours
"""

    prompt = f"""
You are MindWell Assistant, a concise wellness assistant.

Help the user understand their lifestyle patterns and
dataset-derived wellness score.

Do not diagnose medical or mental-health conditions.
Do not present the prediction as a medical diagnosis.
Give practical, non-medical suggestions.

{context}

User:
{message}
"""

    print(f"Prompt preparation: {time.perf_counter() - start:.2f}s")

    api_start = time.perf_counter()

    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=prompt,
        generation_config={
            "thinking_level": "low"
        }
    )

    print(f"Gemini request: {time.perf_counter() - api_start:.2f}s")
    print(f"Total: {time.perf_counter() - start:.2f}s")

    return interaction.output_text