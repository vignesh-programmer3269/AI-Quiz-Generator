from database import init_db, SessionLocal
from models import Quiz
from sqlalchemy import select

if __name__ == "__main__":
    init_db()
    print("Tables created (if not exist).")
    
    db = SessionLocal()
    try:
        result = db.execute(select(Quiz).limit(1)).all()
        print("DB query OK. Rows:", len(result))
    except Exception as e:
        print("DB query failed:", e)
    finally:
        db.close()
