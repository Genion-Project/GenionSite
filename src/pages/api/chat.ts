export const prerender = false; 
import type { APIRoute } from "astro";

const API_KEY = "AIzaSyDL22BnbrdD6xxSJZIJ4DjgST79GnwqRXs"; 
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const website_info = `
Nama: Genion Team
Deskripsi: Tim profesional kreatif & inovatif dengan solusi teknologi terdepan
Layanan: Website Development, AI Solutions, IoT Systems
`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ reply: "⚠️ Pesan kosong tidak bisa diproses." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Kamu adalah chatbot khusus untuk menjawab pertanyaan tentang website berikut:

${website_info}

Pertanyaan pengguna: ${message}
                `,
              },
            ],
          },
        ],
      }),
    });

    // Kalau API gagal → balikin error JSON
    if (!res.ok) {
      const errorText = await res.text();
      return new Response(
        JSON.stringify({
          reply: `⚠️ API Error ${res.status}: ${errorText}`,
        }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    let data;
    try {
      data = await res.json();
    } catch (err) {
      return new Response(
        JSON.stringify({ reply: "⚠️ Response dari API tidak valid JSON." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "⚠️ Maaf, tidak ada jawaban dari API.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ reply: "⚠️ Error: " + (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
