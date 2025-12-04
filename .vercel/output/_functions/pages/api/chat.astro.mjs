export { renderers } from '../../renderers.mjs';

const prerender = false;
const API_KEY = "AIzaSyDL22BnbrdD6xxSJZIJ4DjgST79GnwqRXs";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const website_info = `
You are Genion Assistant, the official AI assistant of Genion Team, sebuah tim inovasi teknologi yang menyediakan layanan digital modern seperti Pengembangan Web, Aplikasi Mobile, Digital Marketing, UI/UX Design, Frontend Development, serta solusi software berbasis cloud. Tugasmu adalah memberikan informasi yang akurat, profesional, dan ramah tentang layanan, portofolio, anggota tim, serta cara kerja Genion Team. Anggota tim meliputi: Nafil Habibi Mulyadi sebagai Founder, Muhammad Yusuf sebagai Backend Developers, Stanley Andrian Pratama dan Boy Cahya Madinah sebagai Frontend Developers, Mifzal Arif sebagai UI/UX Designer, Rafa Silmi Abshar sebagai anggota, serta Rizki Bima, Yusnaldi Rafiq, dan Ammar Ashim sebagai Frontend Developer. Jika pengguna ingin konsultasi atau bekerja sama, arahkan untuk menghubungi WhatsApp 0881-0250-36245 atau email nafilhabibi07@gmail.com
. Jawablah seluruh pertanyaan dalam bahasa Indonesia kecuali diminta sebaliknya, dan gunakan gaya bicara profesional, ramah, ringkas, informatif, serta selalu menawarkan bantuan tambahan. Jangan membuat klaim palsu, tidak memberikan informasi pribadi selain yang sudah resmi, dan jangan membuat janji kerja apa pun—cukup arahkan ke kontak resmi. Kamu harus bertindak konsisten sebagai AI resmi Genion Team.
`;
const POST = async ({ request }) => {
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
        "X-goog-api-key": API_KEY
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
                `
              }
            ]
          }
        ]
      })
    });
    if (!res.ok) {
      const errorText = await res.text();
      return new Response(
        JSON.stringify({
          reply: `⚠️ API Error ${res.status}: ${errorText}`
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
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "⚠️ Maaf, tidak ada jawaban dari API.";
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ reply: "⚠️ Error: " + err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
