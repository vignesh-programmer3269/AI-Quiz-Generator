from fastapi import FastAPI, Query, HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from database import init_db, SessionLocal
from models import Quiz, QuizOutput
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scraper import scrape_wikipedia_url
from quiz_generator import generate_quiz
from datetime import datetime, timezone
import json

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/scrape")
def scrape_wiki(wiki_url: str = Query(..., description="Wikipedia URL to scrape")):
    result = scrape_wikipedia_url(wiki_url)
    return result

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; later restrict to your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/generate-quiz")
async def generate_quiz_endpoint(request: URLRequest, db: Session = Depends(get_db)):
    url = request.url

    article = scrape_wikipedia_url(url)
    if "error" in article:
        raise HTTPException(status_code=400, detail=article["error"])

    title = article["title"]
    content = article["content"]

    quiz = generate_quiz(title, content)
    if "error" in quiz:
        raise HTTPException(status_code=500, detail=quiz)

    quiz["date_generated"] = datetime.now(timezone.utc).isoformat()

    quiz_entry = Quiz(
        url=url,
        title=title,
        scraped_content=content,
        full_quiz_data=json.dumps(quiz),
        date_generated=datetime.now(timezone.utc)
    )
    db.add(quiz_entry)
    db.commit()
    db.refresh(quiz_entry)

    return {
        "message": "Quiz generated and saved successfully",
        "quiz_id": quiz_entry.id
    }

@app.get("/quiz/{quiz_id}")
def get_quiz_by_id(quiz_id: str, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    try:
        quiz_data = json.loads(quiz.full_quiz_data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Stored quiz data is corrupted")

    return {
        "id": quiz.id,
        "url": quiz.url,
        "title": quiz.title,
        "date_generated": quiz.date_generated,
        "summary": quiz_data.get("summary"),
        "questions": quiz_data.get("questions"),
    }