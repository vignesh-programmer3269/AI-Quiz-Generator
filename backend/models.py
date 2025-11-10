from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import Dict, List, Optional
from database import Base
import uuid

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    url = Column(String, nullable=False)
    title = Column(String, nullable=True)
    scraped_content = Column(Text, nullable=True)
    full_quiz_data = Column(Text, nullable=False)  
    date_generated = Column(DateTime(timezone=True), server_default=func.now())

class QuestionItem(BaseModel):
    question_no: int
    question: str
    options: Dict[str, str]
    answer: str
    explanation: Optional[str] = ""

class QuizOutput(BaseModel):
    title: str
    summary: str
    questions: List[QuestionItem]
