## ⚙️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/ai-quiz-generator.git
cd ai-quiz-generator

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

Create a .env File

Before running the backend, you must create a .env file in the backend folder.

backend/.env

Example .env File
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
GOOGLE_API_KEY=your_gemini_api_key_here


⚠️ Without this file, the project will show connection or API key errors when you start it.

Run the Backend Server
uvicorn main:app --reload


Your backend will start at:

http://127.0.0.1:8000


3️⃣ Frontend Setup (React)
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


Try the /generate-quiz endpoint.

Check MongoDB database to confirm quiz data is stored.

✅ Frontend Testing

Start frontend:

npm start


Open in browser:

http://localhost:3000


Generate a Quiz

Enter a topic or URL

Example(Tested) {
    https://en.wikipedia.org/wiki/Java,
    https://en.wikipedia.org/wiki/Python,
    https://en.wikipedia.org/wiki/food
}

Wait for AI to generate quiz

You’ll be redirected to the quiz page

Take the Quiz

Select answers and view result

View History

Visit /history to see all quizzes
```
