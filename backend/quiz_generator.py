import os
import json
import re
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

os.environ["GOOGLE_API_KEY"] = api_key

# Automaticaly get the GEMINI_API_KEY from .env file
model = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

quiz_prompt = """
    You are a professional quiz generator.
    Based on the given Wikipedia article text, generate a structured quiz in JSON format with:
    - Exactly 10 multiple choice questions.
    - Each question must include:
        - A unique question number starting from 1 to 10.
        - A question text.
        - Four options labeled strictly as "A", "B", "C", and "D" (uppercase only), even if the article or content uses lowercase or no labels.
        - The correct answer key (e.g., "A", "B", "C", or "D") that matches one of the options.
    - The correct answer must be placed randomly (not always the same option).
    - Include a short one-line summary (10–20 words) of the article.

    Return only valid JSON. Do not include explanations or markdown. The response must start with {{ and end with }}

    {{
    "title": "{title}",
    "summary": "one-line like 10 to 20 words short summary here",
    "questions": [
        {{
        "question_no": "integer",
        "question": "string",
        "options": {{
            "A": "option A answer",
            "B": "option B answer",
            "C": "option C answer",
            "D": "option D answer",
        }},
        "answer": "A"
        }}
    ]
    }}

    Article title: {title}
    Article content: {content}
"""

def clean_json_string(text: str) -> str:
    """Sanitize Gemini's malformed JSON output."""
    text = text.strip()
    if text.startswith("```"):
        text = text.strip("`").replace("json", "", 1).strip()
    text = re.sub(r'\\n\s*', '', text)
    text = re.sub(r'\\"', '"', text)
    text = re.sub(r'\s+', ' ', text)
    return text

def generate_quiz(title, content):
    try:
        prompt = quiz_prompt.format(title=title, content=content)
        response = model.invoke(prompt)
        ai_text = clean_json_string(response.content)

        return json.loads(ai_text)
    except json.JSONDecodeError:
        return {
            "error": "Invalid JSON received from AI.",
            "raw_response": response.content if response else "No response"
        }
    except Exception as e:
        return {"error": str(e)}