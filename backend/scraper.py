import requests
from bs4 import BeautifulSoup

def scrape_wikipedia_url(url: str):
    if not url.startswith("http"):
        url = "https://" + url

    if not url.startswith("https://en.wikipedia.org/wiki/"):
        return {"error": "Please provide a valid Wikipedia URL."}
    
    headers = {
        "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/119.0.0.0 Safari/537.36"
        )
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": f"Failed to fetch page: {response.status_code}"}

    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.find("h1", {"id": "firstHeading"}).text.strip()

    paragraphs = soup.select("div.mw-parser-output > p")
    summary_text = ""
    for p in paragraphs:
        if p.text.strip():
            summary_text += p.text.strip() + "\n"
        if len(summary_text.split()) > 500:  # limit to ~500 words
            break

    full_text = " ".join(p.text.strip() for p in paragraphs if p.text.strip())

    return {
        "title": title,
        "summary": summary_text.strip(),
        "content": full_text.strip(),
        "url": url
    }
