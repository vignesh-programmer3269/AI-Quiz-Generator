# 🧠 AI Quiz Generator

An AI-powered web application that automatically generates multiple-choice quizzes from Wikipedia articles using **Google Gemini API**.  
Built with **FastAPI (Backend)**, **React (Frontend)**, and **PostgreSQL (Database)**.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vignesh-programmer3269/AI-Quiz-Generator.git
cd ai-quiz-generator
```

## 2️⃣ Backend Setup (FastAPI)

```bash
Create Virtual Environment

cd backend
python -m venv venv

Activate Environment
Windows PowerShell:

venv\Scripts\Activate.ps1

Mac/Linux:

source venv/bin/activate

Install Dependencies

pip install -r requirements.txt
```

## 3️⃣ Create a .env File

```bash

Before running the backend, create a .env file in the backend folder:

backend/.env
Example .env File

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
GOOGLE_API_KEY=your_gemini_api_key_here

⚠️ Without this file, the project will show connection or API key errors when you start it.
```

## 4️⃣ Run the Backend Server

```bash

uvicorn main:app --reload
Your backend will start at:

http://127.0.0.1:8000
```

## ⚛️ Frontend Setup (React)

```bash

Move to Frontend Directory

cd ../frontend

Install Dependencies

npm install

Start Development Server

npm start

Your frontend will run on:

http://localhost:3000

🧪 Testing the App

✅ Backend Testing
Run backend:

uvicorn main:app --reload
Visit Swagger Docs:

http://127.0.0.1:8000/docs
(or)
 http://localhost:8000/docs

Try the /generate-quiz endpoint.

Check PostgreSQL database to confirm quiz data is stored.

✅ Frontend Testing
Start frontend:

npm start
Open the app in browser:

http://localhost:3000

Generate a Quiz

Enter a Wikipedia URL
Example URL (tested):

https://en.wikipedia.org/wiki/Java
https://en.wikipedia.org/wiki/Python
https://en.wikipedia.org/wiki/Food

Wait for AI to generate quiz

You’ll be redirected to the quiz page

Take the Quiz

Select answers for each question

Navigate with Next/Previous buttons

View your result with correct answers and explanations

Generate more quizzes

View History from home page

Visit http://localhost:3000/quizzes-history page

See all generated quizzes with titles and timestamps

🧩 API Endpoints Overview
Method  |     Endpoint       |          Description
POST    |  /generate-quiz    |  Generate a new quiz from Wikipedia URL
GET     |  /quiz/{quiz_id}   |  Fetch a specific quiz by ID
GET     |  /quizzes Fetch    |  all previously generated quizzes

⚠️ Common Issues
Issue     |              Cause                                               Solution
Database  |  connection failed Invalid or missing    |  DATABASE_URL Check .env file credentials
Missing   |  Google API Key GOOGLE_API_KEY not set   |  Add valid Gemini API key to .env
CORS      |  Policy Error Backend and frontend running on different ports | Ensure CORS is enabled in main.py
Module    |  Not Found Dependencies not installed    |  Run pip install -r requirements.txt or npm install
```
