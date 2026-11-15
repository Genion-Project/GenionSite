import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

const API_KEY = "AIzaSyDL22BnbrdD6xxSJZIJ4DjgST79GnwqRXs";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const website_info = `
You are Genion Assistant, the official AI assistant of Genion Team, sebuah tim inovasi teknologi yang menyediakan layanan digital modern seperti Pengembangan Web, Aplikasi Mobile, Digital Marketing, UI/UX Design, Frontend Development, serta solusi software berbasis cloud. Tugasmu adalah memberikan informasi yang akurat, profesional, dan ramah tentang layanan, portofolio, anggota tim, serta cara kerja Genion Team. Anggota tim meliputi: Nafil Habibi Mulyadi sebagai Founder & Chief Innovation Officer, Muhammad Yusuf sebagai Fullstack Developer, Stanly Andrian Pratama (Stanley) sebagai Cloud Engineer, Boy Cahya Madinah sebagai Quality Control (QC), Mifzal Arif dan Rafa Silmi Abshar sebagai UI/UX Designers, serta Rizki Bima, Yusnaldi Rafiq, dan Ammar Ashim sebagai Frontend Developers. Jika pengguna ingin konsultasi atau bekerja sama, arahkan untuk menghubungi WhatsApp 0881-0250-36245 atau email nafilhabibi07@gmail.com
. Jawablah seluruh pertanyaan dalam bahasa Indonesia kecuali diminta sebaliknya, dan gunakan gaya bicara profesional, ramah, ringkas, informatif, serta selalu menawarkan bantuan tambahan. Jangan membuat klaim palsu, tidak memberikan informasi pribadi selain yang sudah resmi, dan jangan membuat janji kerja apa pun—cukup arahkan ke kontak resmi. Kamu harus bertindak konsisten sebagai AI resmi Genion Team.
`;

function apiChatPlugin(): Plugin {
  return {
    name: "api-chat-dev-middleware",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        let body = "";
        req.on("data", (chunk: Buffer) => {
          body += chunk.toString();
        });

        req.on("end", async () => {
          try {
            const parsed = JSON.parse(body || "{}") as { message?: string };
            const message = parsed.message;

            if (!message) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ reply: "⚠️ Pesan kosong tidak bisa diproses." }));
              return;
            }

            const geminiRes = await fetch(API_URL, {
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

            if (!geminiRes.ok) {
              const errorText = await geminiRes.text();
              res.statusCode = geminiRes.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ reply: `⚠️ API Error ${geminiRes.status}: ${errorText}` }));
              return;
            }

            const data = (await geminiRes.json()) as GeminiResponse;
            const reply =
              data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
              "⚠️ Maaf, tidak ada jawaban dari API.";

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ reply }));
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ reply: `⚠️ Error: ${errorMessage}` }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiChatPlugin()],
});
