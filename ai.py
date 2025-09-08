import requests

API_KEY = "GEMINI_API_KEY"  # ganti dengan API key kamu
API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

# konteks web
website_info = """
Nama: Genion Team
Deskripsi: Tim profesional kreatif & inovatif dengan solusi teknologi terdepan
Layanan: Website Development, AI Solutions, IoT Systems
"""

def ask_bot(question):
    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": "AIzaSyAX9MVI1cG4cAz0mxDg6QG9zXGZMwm4ayg"
    }

    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"""
Kamu adalah chatbot khusus untuk menjawab pertanyaan tentang website berikut:

{website_info}

Pertanyaan pengguna: {question}
                        """
                    }
                ]
            }
        ]
    }

    response = requests.post(API_URL, headers=headers, json=data)
    result = response.json()
    
    try:
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except:
        return result

# Tes chatbot
while True:
    q = input("Tanya: ")
    if q.lower() in ["exit", "quit"]:
        break
    print("Bot:", ask_bot(q))
