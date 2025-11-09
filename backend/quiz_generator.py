import os
import json
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
    - 10 multiple choice questions.
    - Each question must have exactly 4 options (A, B, C, D).
    - Include the correct answer key.
    - Include a short summary of the article.

    Return only valid JSON in the following format:

    {{
    "title": "{title}",
    "summary": "short summary here",
    "questions": [
        {{
        "question": "string",
        "options": ["A", "B", "C", "D"],
        "answer": "A"
        }}
    ]
    }}

    Article title: {title}
    Article content: {content}
"""

def generate_quiz(title, content):
    try:
        prompt = quiz_prompt.format(title=title, content=content)
        response = model.invoke(prompt)
        ai_text = response.content.strip()

        if ai_text.startswith("```"):
            ai_text = ai_text.strip("`")  # remove all backticks
            ai_text = ai_text.replace("json", "", 1).strip() 

        return json.loads(ai_text)
    except json.JSONDecodeError:
        return {
            "error": "Invalid JSON received from AI.",
            "raw_response": response.content if response else "No response"
        }
    except Exception as e:
        return {"error": str(e)}