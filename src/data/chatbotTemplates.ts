export interface QuickAction {
  label: string;
  url?: string;
  isExternal?: boolean;
  query?: string;
}

export interface TemplateResponse {
  text: string;
  actions?: QuickAction[];
}

export const WA_NUMBER = "+62 881-0205-36245";
export const WA_URL =
  "https://wa.me/62881020536245?text=Halo%20Genion%20Team,%20saya%20ingin%20konsultasi%20mengenai%20proyek%20digital";
export const EMAIL_OFFICIAL = "info@genionteam.com";
export const EMAIL_ALT = "nafilhabibi07@gmail.com";

export const SPEECH_BUBBLE_MESSAGES = [
  "Halo! Saya Genisten, asisten Genion Team",
  "Butuh website atau aplikasi mobile? Tanya di sini!",
  "Konsultasi ide proyek digital Anda bersama kami",
  "Klik untuk lihat layanan & penawaran Genion!",
];

export const QUICK_TOPIC_CHIPS = [
  { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
  { label: "Biaya & Harga", query: "Berapa biaya pembuatan proyek?" },
  { label: "Portofolio", query: "Apa saja portofolio Genion?" },
  { label: "Waktu Pengerjaan", query: "Berapa lama proses pengerjaannya?" },
  { label: "Garansi & Support", query: "Apakah ada garansi dan maintenance?" },
  { label: "Tim Genion", query: "Siapa saja tim Genion?" },
  { label: "Hubungi Tim", query: "Bagaimana cara menghubungi Genion Team?" },
];

export const INITIAL_BOT_MESSAGE: TemplateResponse = {
  text: "Halo! Saya **Genisten**, asisten virtual resmi dari **Genion Team**.\n\nKami siap membantu mewujudkan proyek teknologi Anda dengan solusi modern, berkualitas tinggi, dan andal.\n\nSilakan pilih topik cepat di bawah atau ketik langsung pertanyaan Anda!",
  actions: [
    { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
    { label: "Biaya Pembuatan", query: "Berapa biaya pembuatan proyek?" },
    { label: "Portofolio", query: "Apa saja portofolio Genion?" },
    { label: "Chat WhatsApp", url: WA_URL, isExternal: true },
  ],
};

export function getBotTemplateResponse(userInput: string): TemplateResponse {
  const q = userInput.toLowerCase().trim();

  // 1. Specific Members
  if (/\b(nafil|habibi)\b/.test(q)) {
    return {
      text: "**Nafil Habibi Mulyadi** adalah **Founder & Chief Innovation Officer (CEO)** dari Genion Team.\n\n• Pengalaman: 5+ tahun memimpin transformasi digital dan arsitektur sistem teknologi.\n• Keahlian Utama: *Leadership, Full Stack Development, Cloud Architecture, Machine Learning, dan Robotics*.\n• Visi: Menghubungkan relasi manusia dan inovasi teknologi untuk menciptakan masa depan digital yang berdampak nyata.",
      actions: [
        { label: "Lihat Semua Tim", url: "/team" },
        { label: "Cerita Genion", url: "/about" },
        { label: "Hubungi Nafil (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  if (/\b(yusuf|yf)\b/.test(q)) {
    return {
      text: "**Muhammad Yusuf** adalah **Backend & Fullstack Developer** di Genion Team.\n\n• Peran: Spesialis arsitektur backend, RESTful API, dan optimasi database performa tinggi.\n• Keahlian Utama: *Laravel, PHP, PostgreSQL, Python, Astro, Tailwind CSS, dan Figma*.\n• Fokus: Membangun sistem yang handal, cepat, dan aman untuk kebutuhan aplikasi skala besar.",
      actions: [
        { label: "Lihat Profil Tim", url: "/team" },
        { label: "Portofolio Proyek", query: "Apa saja portofolio Genion?" },
      ],
    };
  }

  if (/\b(boy|cahya)\b/.test(q)) {
    return {
      text: "**Boy Cahya Madinah** adalah **Quality Control (QC)** di Genion Team.\n\n• Peran: Memastikan setiap kode, antarmuka, dan fungsionalitas produk digital memenuhi standar kualitas tinggi sebelum rilis ke klien.\n• Keahlian Utama: *Software Testing, DevTools, GitHub, Figma, dan Tailwind CSS*.\n• Fokus: Deteksi dini bug, efisiensi alur pengguna, dan keandalan sistem.",
      actions: [{ label: "Lihat Profil Tim", url: "/team" }],
    };
  }

  if (/\b(stanly|andrian)\b/.test(q)) {
    return {
      text: "**Stanly Andrian Pratama** adalah **Backend Developer** di Genion Team.\n\n• Keahlian Utama: *C++, MySQL, AWS Cloud, Rust, dan Full Stack Development*.\n• Fokus: Specialist arsitektur sistem tingkat lanjut, konkurensi, dan optimasi database.",
      actions: [{ label: "Lihat Tim", url: "/team" }],
    };
  }

  if (/\b(mifzal|arif)\b/.test(q)) {
    return {
      text: "**Mifzal Arif** adalah **UI/UX Designer** di Genion Team.\n\n• Motto: *Design tak hanya soal bagus, tapi juga soal fungsi dan pengalaman pengguna.*\n• Keahlian: *Figma, Adobe XD, High-Fidelity Prototyping, dan User Research*.",
      actions: [{ label: "Layanan UI/UX", query: "Ceritakan tentang layanan UI/UX" }],
    };
  }

  if (/\b(rafa|silmi)\b/.test(q)) {
    return {
      text: "**Rafa Silmi Abshar** adalah **UI/UX Designer** di Genion Team dengan fokus pada perancangan antarmuka visual fungsional, ergonomis, dan modern.",
      actions: [{ label: "Profil Tim", url: "/team" }],
    };
  }

  if (/\b(bima|rizky bima)\b/.test(q)) {
    return {
      text: "**Rizky Bima Putra Aini** adalah **Frontend Developer** di Genion Team dengan keahlian JavaScript, Tailwind CSS, dan Figma.",
      actions: [{ label: "Profil Tim", url: "/team" }],
    };
  }

  if (/\b(ammar|ashim)\b/.test(q)) {
    return {
      text: "**Ammar Ashim Hadi** adalah **Frontend Developer** di Genion Team yang berdedikasi membangun antarmuka web interaktif dan memanjakan mata.",
      actions: [{ label: "Profil Tim", url: "/team" }],
    };
  }

  if (/\b(danu|ramadanu)\b/.test(q)) {
    return {
      text: "**Ramadanu** adalah **Full Stack Developer** di Genion Team dengan keahlian JavaScript, Node.js, MongoDB, dan AWS.",
      actions: [{ label: "Profil Tim", url: "/team" }],
    };
  }

  if (/\b(yusnaldi|rafiq)\b/.test(q)) {
    return {
      text: "**Yusnaldi Rafiq** adalah **Frontend Developer** di Genion Team yang berfokus pada performa render web dan kenyamanan interaksi pengguna.",
      actions: [{ label: "Profil Tim", url: "/team" }],
    };
  }

  if (/\b(chacha|pelangi)\b/.test(q)) {
    return {
      text: "**Chacha Pelangi Parawansha** adalah **Digital Marketing Specialist** di Genion Team yang mengoptimalkan visibilitas brand online dan strategi konten berbasis data.",
      actions: [{ label: "Profil Tim", url: "/team" }],
    };
  }

  // 2. Specific Projects
  if (/\b(edufo)\b/.test(q)) {
    return {
      text: "**Edufo CRM (Web & Mobile Integration)**\n\nEdufo adalah platform sistem informasi pendidikan dan sistem pembayaran whitelabel terintegrasi:\n\n• Whitelabel Payment Gateway terpadu untuk institusi pendidikan.\n• Sinkronisasi data real-time dengan aplikasi mobile siswa & orang tua.\n• Dashboard analitik absensi, nilai, dan tagihan multi-tenant.\n• Stack: Tailwind CSS, Laravel (PHP), dan integrasi API Mobile.",
      actions: [
        { label: "Lihat di Beranda", url: "/" },
        { label: "Diskusi Proyek Edufo (WA)", url: WA_URL, isExternal: true },
        { label: "Portofolio Lainnya", query: "Apa saja portofolio Genion?" },
      ],
    };
  }

  if (/\b(kostapp|kost|kos)\b/.test(q)) {
    return {
      text: "**KostApp - Platform Booking & Manajemen Kost**\n\nSolusi digital terintegrasi untuk pemilik dan pencari hunian sewa kost:\n\n• Pencarian kamar kost cerdas berbasis geolokasi.\n• Sistem pemesanan kamar dan pembayaran sewa instan.\n• Dashboard real-time pemilik kost untuk monitoring okupansi & jatuh tempo.\n• Stack: Tailwind CSS, Laravel, dan Flutter Mobile App.",
      actions: [
        { label: "Lihat di Beranda", url: "/" },
        { label: "Buat Aplikasi Serupa (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  if (/\b(bendahara)\b/.test(q)) {
    return {
      text: "**Bendahara App - Finance & Accounting**\n\nAplikasi Web & Mobile untuk pencatatan dan pengelolaan kas masuk/keluar secara transparan:\n\n• Pencatatan transaksi harian cepat dan otomatisasi saldo.\n• Ekspor laporan pembukuan format PDF dan Excel siap cetak.\n• Dukungan sinkronisasi offline-first dengan server cloud.\n• Multi-user audit log untuk akuntabilitas tinggi.",
      actions: [
        { label: "Lihat di Beranda", url: "/" },
        { label: "Diskusi Kebutuhan (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 3. Warranty & Maintenance
  if (/\b(garansi|maintenance|support|bantuan teknis|bug|error|rusak|revisi|dukungan|after sales)\b/.test(q)) {
    return {
      text: "**Garansi & Layanan Pemeliharaan (Maintenance)**\n\nKami memastikan setiap produk digital yang kami rilis berjalan dengan lancar dan aman:\n\n• **Garansi Bug-Free**: Setiap proyek mendapatkan masa garansi bebas bug pasca peluncuran.\n• **Revisi Sesuai Scope**: Kami menyediakan iterasi perbaikan sesuai kesepakatan awal.\n• **Paket Maintenance Jangka Panjang**: Layanan monitoring server, pembaruan keamanan, backup berkala, dan peningkatan fitur.\n• **Dukungan Teknis Cepat**: Tim teknis kami siap merespons jika terjadi kendala pada sistem.",
      actions: [
        { label: "Konsultasi SLA (WA)", url: WA_URL, isExternal: true },
        { label: "Alur Pengerjaan", query: "Bagaimana alur pengerjaannya?" },
        { label: "Biaya Proyek", query: "Berapa biaya pembuatan proyek?" },
      ],
    };
  }

  // 4. Pricing / Cost
  if (/\b(harga|biaya|tarif|ongkos|budget|paket|price|pricing|cost|bayar|pembayaran|dp|murah|diskon|promo)\b/.test(q)) {
    return {
      text: "**Informasi Biaya & Sistem Pembayaran Genion Team**\n\nBiaya pengembangan disesuaikan dengan skala, fitur, dan tingkat kompleksitas proyek Anda:\n\n• **Landing Page / Web Sederhana**: Mulai dari paket ekonomis & siap pakai dalam hitungan hari.\n• **Company Profile Perusahaan**: Desain eksklusif, SEO-ready, dan CMS admin panel mandiri.\n• **Web App & Portal Custom**: Disesuaikan dengan alur database, integrasi sistem, dan jumlah modul.\n• **Aplikasi Mobile (Android & iOS)**: Sesuai arsitektur backend dan fitur aplikasi.\n\n**Sistem Pembayaran**: Bertahap (DP di awal, milestone progres, dan pelunasan setelah lolos uji QC).\n\n**Konsultasi & Estimasi RAB Gratis!** Silakan ceritakan ide Anda via WhatsApp untuk penawaran terbaik.",
      actions: [
        { label: "Minta Estimasi Harga (WA)", url: WA_URL, isExternal: true },
        { label: "Waktu Pengerjaan", query: "Berapa lama proses pengerjaannya?" },
        { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
      ],
    };
  }

  // 5. Timeline / Duration
  if (
    /\b(berapa lama|lama|durasi|timeline|deadline|target|cepat|express)\b/.test(q) ||
    (/\bwaktu\b/.test(q) && !/\bselamat\b/.test(q))
  ) {
    return {
      text: "**Estimasi Waktu Pengerjaan Proyek**\n\nJadwal pengerjaan dirancang transparan dengan milestone progres mingguan:\n\n• **Landing Page / Web Promo**: 1 – 2 minggu\n• **Website Company Profile**: 2 – 4 minggu\n• **Web Application & CRM Custom**: 1 – 2 bulan\n• **Aplikasi Mobile (Android/iOS)**: 1 – 3 bulan\n• **UI/UX Design Kompleks**: 1 – 3 minggu\n\n*Catatan: Timeline bisa disesuaikan dengan kebutuhan mendesak (fast-track delivery) sesuai kesepakatan bersama.*",
      actions: [
        { label: "Jadwalkan Diskusi (WA)", url: WA_URL, isExternal: true },
        { label: "Alur Kerja Kami", query: "Bagaimana alur pengerjaannya?" },
        { label: "Biaya Pembuatan", query: "Berapa biaya pembuatan proyek?" },
      ],
    };
  }

  // 6. Workflow / How to Order
  if (/\b(alur|tahap|tahapan|langkah|cara kerja|cara pesan|cara order|metode|proses)\b/.test(q)) {
    return {
      text: "**5 Tahapan Alur Kerja Genion Team**\n\n1. **Konsultasi & Analisis Kebutuhan**: Memahami tujuan bisnis, target audiens, dan problem yang ingin diselesaikan.\n2. **Perencanaan & UI/UX Design**: Pembuatan wireframe, user flow, dan desain interaktif Figma yang dapat ditinjau langsung.\n3. **Development & Koding**: Pengkodean berbasis best-practice, aman, bersih, dan berkinerja tinggi.\n4. **Pengujian & Quality Control (QC)**: Uji fungsionalitas, keamanan, dan kompatibilitas di berbagai perangkat.\n5. **Deployment & Serah Terima**: Peluncuran aplikasi, konfigurasi domain/hosting, serta sesi panduan pemakaian.",
      actions: [
        { label: "Mulai Proyek Anda (WA)", url: WA_URL, isExternal: true },
        { label: "Garansi & Support", query: "Apakah ada garansi dan maintenance?" },
        { label: "Lihat Layanan", url: "/services" },
      ],
    };
  }

  // 7. Contact / Location
  if (/\b(kontak|hubungi|contact|wa|whatsapp|telepon|telp|hp|nomor|no hp|email|alamat|lokasi|kantor|office|meeting|ketemu|dimana)\b/.test(q)) {
    return {
      text: "**Kontak Resmi Genion Team**\n\nSilakan hubungi kami untuk konsultasi, kerjasama, maupun pertanyaan teknis:\n\n• **WhatsApp**: [+62 881-0205-36245](https://wa.me/62881020536245)\n• **Email Resmi**: [info@genionteam.com](mailto:info@genionteam.com)\n• **Email Founder**: [nafilhabibi07@gmail.com](mailto:nafilhabibi07@gmail.com)\n• **Lokasi Kantor**: Jakarta, Indonesia\n• **Jam Layanan**: Senin – Sabtu (09.00 – 18.00 WIB)\n\nKami melayani konsultasi daring maupun pertemuan tatap muka di area Jakarta.",
      actions: [
        { label: "Buka WhatsApp Sekarang", url: WA_URL, isExternal: true },
        { label: "Form Halaman Kontak", url: "/contact" },
      ],
    };
  }

  // 8. Portfolio
  if (/\b(portofolio|portfolio|proyek|project|karya|contoh hasil|klien|client)\b/.test(q)) {
    return {
      text: "**Portofolio Unggulan Genion Team**\n\nBerikut beberapa proyek teknologi yang berhasil kami kembangkan:\n\n1. **Edufo CRM**: Platform pendidikan & whitelabel payment gateway yang terhubung dengan aplikasi mobile siswa.\n2. **KostApp**: Aplikasi mobile & web booking kamar kost dengan geolocation dan dashboard pemantau okupansi.\n3. **Bendahara App**: Aplikasi manajemen pencatatan kas masuk/keluar transparan dengan ekspor laporan PDF & Excel.\n4. **Kerjasama Industri**: Kolaborasi digital bersama Murata, Nuris, dan BKK.",
      actions: [
        { label: "Lihat Showcase Beranda", url: "/" },
        { label: "Konsultasi Proyek Baru (WA)", url: WA_URL, isExternal: true },
        { label: "Tech Stack Kami", query: "Teknologi apa yang digunakan?" },
      ],
    };
  }

  // 9. Team Overview
  if (/\b(tim|team|anggota|member|pendiri|founder|ceo|struktur)\b/.test(q)) {
    return {
      text: "**Tim Profesional Genion**\n\nGenion Team beranggotakan para talenta teknologi berdedikasi:\n\n• **Nafil Habibi Mulyadi** — Founder & Chief Innovation Officer\n• **Muhammad Yusuf** — Backend & Fullstack Developer\n• **Boy Cahya Madinah** — Quality Control (QC)\n• **Stanly Andrian Pratama** — Backend Developer\n• **Mifzal Arif & Rafa Silmi** — UI/UX Designers\n• **Ammar Ashim, Rizky Bima, Yusnaldi Rafiq** — Frontend Developers\n• **Ramadanu** — Full Stack Developer\n• **Chacha Pelangi Parawansha** — Digital Marketing Specialist",
      actions: [
        { label: "Buka Halaman Tim", url: "/team" },
        { label: "Tentang Kami", url: "/about" },
        { label: "Profil Founder", query: "Siapa Nafil Habibi?" },
      ],
    };
  }

  // 10. Tech Stack
  if (/\b(teknologi|technology|tech|stack|bahasa|framework|library|coding)\b/.test(q)) {
    return {
      text: "**Tech Stack & Teknologi yang Digunakan**\n\nKami memilih kombinasi teknologi modern yang terbukti cepat, aman, dan mudah dikembangkan:\n\n• **Frontend Web**: React, TypeScript, Astro, Next.js, Tailwind CSS\n• **Backend & API**: Laravel (PHP), Node.js, Express, Python\n• **Aplikasi Mobile**: Flutter, React Native (iOS & Android)\n• **Database**: PostgreSQL, MySQL, MongoDB, Redis\n• **Cloud & Infrastruktur**: AWS, Vercel, Docker, Git CI/CD",
      actions: [
        { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
        { label: "Diskusi Teknis (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 11. Sub-services: Web
  if (/\b(web|website|landing page|company profile|e-commerce|web app)\b/.test(q)) {
    return {
      text: "**Layanan Pengembangan Website Genion**\n\nKami membuat website yang responsif, modern, dan SEO-friendly untuk meningkatkan kredibilitas serta penjualan bisnis Anda:\n\n• **Website Company Profile**: Tampilan profesional dengan CMS mandiri.\n• **Landing Page Penjualan**: Desain menarik dengan copywriting terarah dan konversi tinggi.\n• **Toko Online / E-Commerce**: Sistem checkout, inventori, dan payment gateway.\n• **Web Application Custom**: Sistem informasi manajemen dan database perusahaan.",
      actions: [
        { label: "Halaman Layanan", url: "/services" },
        { label: "Buat Website Sekarang (WA)", url: WA_URL, isExternal: true },
        { label: "Berapa Biayanya?", query: "Berapa biaya pembuatan website?" },
      ],
    };
  }

  // 12. Sub-services: Mobile
  if (/\b(mobile|android|ios|apk|flutter|aplikasi hp)\b/.test(q)) {
    return {
      text: "**Layanan Aplikasi Mobile (iOS & Android)**\n\nKembangkan aplikasi mobile dengan performa terbaik dan pengalaman pengguna yang memikat:\n\n• Multiplatform (Flutter & React Native) untuk efisiensi anggaran dan waktu.\n• Sinkronisasi database cloud real-time dan push notifikasi interaktif.\n• Desain antarmuka modern yang mematuhi standar Google Material & Apple HIG.\n• Dukungan penuh proses submit ke Play Store dan App Store.",
      actions: [
        { label: "Halaman Layanan", url: "/services" },
        { label: "Diskusi Ide Aplikasi (WA)", url: WA_URL, isExternal: true },
        { label: "Contoh: KostApp", query: "Ceritakan tentang KostApp" },
      ],
    };
  }

  // 13. Sub-services: UI/UX
  if (/\b(ui|ux|desain|design|figma|wireframe|prototype)\b/.test(q)) {
    return {
      text: "**Layanan UI/UX Design**\n\nDesain antarmuka intuitif dan memukau untuk produk digital Anda:\n\n• **User Research & Persona**: Memahami alur kerja pengguna sebenarnya.\n• **Wireframing & Alur Navigasi**: Struktur informasi yang rapi dan teruji.\n• **High-Fidelity Prototype**: Prototipe Figma interaktif yang siap diuji sebelum koding.\n• **Design System**: Pedoman warna, tipografi, dan komponen reusable.",
      actions: [
        { label: "Halaman Layanan", url: "/services" },
        { label: "Diskusi Desain (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 14. Sub-services: Cloud
  if (/\b(cloud|server|aws|hosting|devops|migrasi)\b/.test(q)) {
    return {
      text: "**Solusi Cloud & Infrastruktur Server**\n\nOptimalkan performa, keamanan, dan keandalan sistem Anda:\n\n• Migrasi hosting/server ke arsitektur cloud scalable (AWS / VPS).\n• Manajemen database, backup otomatis berkala, dan failover protection.\n• Konfigurasi domain, sertifikat SSL, dan perlindungan keamanan server.",
      actions: [
        { label: "Halaman Layanan", url: "/services" },
        { label: "Konsultasi Cloud (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 15. Sub-services: Marketing & SEO
  if (/\b(marketing|seo|sosmed|social media|digital marketing)\b/.test(q)) {
    return {
      text: "**Layanan Digital Marketing & SEO**\n\nTingkatkan visibilitas online dan penjualan produk/jasa bisnis Anda:\n\n• **SEO Optimization**: Optimasi kata kunci pencarian agar website muncul di halaman 1 Google.\n• **Social Media Management**: Perencanaan dan desain konten media sosial yang konsisten.\n• **Content Strategy**: Strategi konten yang memikat dan membangun audiens loyal.",
      actions: [
        { label: "Halaman Layanan", url: "/services" },
        { label: "Konsultasi Marketing (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 16. General Services
  if (/\b(layanan|jasa|service|services|solusi|bisa buat apa|fitur)\b/.test(q)) {
    return {
      text: "**Layanan Lengkap Genion Team**\n\nKami menyediakan 6 pilar layanan teknologi digital:\n\n1. **Pengembangan Web**: Landing Page, Company Profile, E-Commerce, dan Web App Custom.\n2. **Pengembangan Aplikasi Mobile**: iOS & Android dengan Flutter dan React Native.\n3. **UI/UX Design**: Desain visual, riset pengguna, dan prototipe interaktif Figma.\n4. **Digital Marketing**: SEO on-page/off-page dan pengelolaan konten digital.\n5. **Cloud Solutions**: Migrasi server, database optimization, dan arsitektur cloud.\n6. **Konsultasi IT**: Perencanaan arsitektur teknologi dan transformasi digital.",
      actions: [
        { label: "Buka Halaman Layanan", url: "/services" },
        { label: "Estimasi Biaya", query: "Berapa biaya pembuatan proyek?" },
        { label: "Chat WhatsApp", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 17. Conversational: Thanks
  if (/\b(terima kasih|terimakasih|makasih|thanks|thank you|maturnuwun|sip|mantap|keren|siap)\b/.test(q)) {
    return {
      text: "Sama-sama! Senang bisa membantu Anda.\n\nJika ada hal lain yang ingin ditanyakan atau ingin langsung berdiskusi mengenai proyek digital Anda, tim Genion siap melayani kapan saja. Semoga sukses selalu!",
      actions: [
        { label: "Hubungi WhatsApp Kami", url: WA_URL, isExternal: true },
        { label: "Menu Panduan", query: "Menu bantuan" },
      ],
    };
  }

  // 18. Conversational: Help / Menu
  if (/\b(menu|bantuan|help|panduan|opsi|pilihan)\b/.test(q)) {
    return {
      text: "**Menu Panduan Chatbot Genisten**\n\nBerikut beberapa informasi yang sering ditanyakan tentang Genion Team:\n\n• **Layanan & Solusi**: Pembuatan website, mobile app, UI/UX, cloud.\n• **Biaya & Pembayaran**: Sistem harga fleksibel dan pembayaran bertahap.\n• **Waktu Pengerjaan**: Estimasi durasi per jenis proyek.\n• **Portofolio**: Edufo CRM, KostApp, Bendahara App.\n• **Garansi**: Garansi bebas bug dan paket pemeliharaan berkala.\n• **Kontak Langsung**: WhatsApp dan Email resmi.",
      actions: [
        { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
        { label: "Biaya & Harga", query: "Berapa biaya pembuatan proyek?" },
        { label: "Portofolio", query: "Apa saja portofolio Genion?" },
        { label: "Chat WhatsApp", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 19. Conversational: Greeting
  if (/\b(halo|hai|hey|hi|hello|p|tes|test|pagi|siang|sore|malam|assalam|assalamu'alaikum|assalamualaikum|apa kabar|kamu siapa|siapa kamu|genisten)\b/.test(q)) {
    return {
      text: "Halo! Saya **Genisten**, asisten resmi dari **Genion Team**.\n\nKami adalah tim inovasi teknologi yang siap membantu mewujudkan proyek digital Anda, mulai dari website, mobile apps, hingga UI/UX design.\n\nAda yang bisa saya bantu hari ini? Anda bisa memilih opsi di bawah atau mengetik pertanyaan secara bebas!",
      actions: [
        { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
        { label: "Biaya Proyek", query: "Berapa biaya pembuatan proyek?" },
        { label: "Portofolio", query: "Apa saja portofolio Genion?" },
        { label: "Hubungi Tim (WA)", url: WA_URL, isExternal: true },
      ],
    };
  }

  // 20. Fallback
  return {
    text: "Terima kasih atas pertanyaannya! Saya adalah asisten virtual resmi dengan **jawaban template seputar Genion Team**.\n\nUntuk pertanyaan khusus atau konsultasi teknis mendalam mengenai kebutuhan Anda, tim kami akan dengan senang hati berdiskusi secara langsung melalui WhatsApp atau Email.\n\nSilakan pilih salah satu opsi cepat di bawah ini:",
    actions: [
      { label: "Tanya Langsung di WA", url: WA_URL, isExternal: true },
      { label: "Layanan Kami", query: "Layanan apa saja yang tersedia?" },
      { label: "Biaya Pembuatan", query: "Berapa biaya pembuatan proyek?" },
      { label: "Portofolio", query: "Apa saja portofolio Genion?" },
    ],
  };
}
