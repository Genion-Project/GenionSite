export type ProjectCategory =
  | "Semua"
  | "Web Development"
  | "Mobile App"
  | "UI/UX & System"
  | "Enterprise Solution";

export interface ProjectTech {
  name: string;
  bg: string;
  text: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Semua" | "Web Development" | "Mobile App" | "UI/UX & System" | "Enterprise Solution";
  tag: string;
  year: string;
  client?: string;
  description: string;
  longDescription: string;
  image: string;
  techs: { name: string; bg: string; text: string }[];
  highlights: string[];
  deliverables: string[];
  stats: { label: string; value: string }[];
  featured?: boolean;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Semua",
  "Web Development",
  "Mobile App",
  "UI/UX & System",
  "Enterprise Solution",
];

export const projects: ProjectItem[] = [
  {
    id: "edufo-crm",
    title: "Edufo CRM",
    category: "Enterprise Solution",
    tag: "Education & CRM",
    year: "2024",
    client: "Edufo Technology Ecosystem",
    description:
      "Website Pembelian & Manajemen Aplikasi Whitelabel Payment and Study Education Information (Edufo) yang terintegrasi langsung ke aplikasi mobile.",
    longDescription:
      "Edufo CRM adalah platform manajemen institusi pendidikan komprehensif yang menghubungkan administrasi sekolah, pembayaran SPP/biaya pendidikan dengan payment gateway whitelabel, serta sinkronisasi data real-time dengan aplikasi mobile untuk orang tua dan siswa.",
    image: "/Edufo-Aset.png",
    techs: [
      {
        name: "Laravel",
        bg: "bg-red-100/80 dark:bg-red-900/50",
        text: "text-red-800 dark:text-red-200",
      },
      {
        name: "PHP",
        bg: "bg-indigo-100/80 dark:bg-indigo-900/50",
        text: "text-indigo-800 dark:text-indigo-200",
      },
      {
        name: "Tailwind CSS",
        bg: "bg-blue-100/80 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-200",
      },
      {
        name: "PostgreSQL",
        bg: "bg-sky-100/80 dark:bg-sky-900/50",
        text: "text-sky-800 dark:text-sky-200",
      },
      {
        name: "REST API",
        bg: "bg-emerald-100/80 dark:bg-emerald-900/50",
        text: "text-emerald-800 dark:text-emerald-200",
      },
    ],
    highlights: [
      "Whitelabel payment gateway integration untuk pembayaran SPP multi-channel",
      "Real-time sync data absensi dan akademik ke aplikasi mobile siswa & orang tua",
      "Dashboard analitik keuangan dan pertumbuhan murid untuk yayasan",
      "Sistem perizinan role-based access control & multi-tenant billing",
    ],
    deliverables: [
      "Admin CRM Portal Web (SaaS Multi-tenant)",
      "Integrasi API Gateway dengan Mobile App",
      "Whitelabel Payment Processing Engine",
      "Modul Rekapitulasi & Laporan Otomatis",
    ],
    stats: [
      { label: "Active Institutions", value: "35+" },
      { label: "Transactions Processed", value: "Rp 2.4M+" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    featured: true,
  },
  {
    id: "kostapp",
    title: "KostApp - Pemesanan Kost",
    category: "Mobile App",
    tag: "Property & Booking",
    year: "2024",
    client: "KostApp Indonesia",
    description:
      "Aplikasi mobile dan dashboard real-time untuk pencarian, pemesanan, dan pengelolaan sewa kamar kost secara transparan.",
    longDescription:
      "KostApp menghadirkan kemudahan bagi pencari hunian dan pemilik kost di kota-kota besar. Dilengkapi integrasi peta geolokasi, virtual tour kamar, otomasi kontrak sewa digital, dan gerbang pembayaran terpadu dengan reminder jatuh tempo otomatis.",
    image: "/beranda_kostapp.png",
    techs: [
      {
        name: "Flutter",
        bg: "bg-cyan-100/80 dark:bg-cyan-900/50",
        text: "text-cyan-800 dark:text-cyan-200",
      },
      {
        name: "Laravel",
        bg: "bg-red-100/80 dark:bg-red-900/50",
        text: "text-red-800 dark:text-red-200",
      },
      {
        name: "MySQL",
        bg: "bg-amber-100/80 dark:bg-amber-900/50",
        text: "text-amber-800 dark:text-amber-200",
      },
      {
        name: "Tailwind CSS",
        bg: "bg-blue-100/80 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-200",
      },
    ],
    highlights: [
      "Pencarian kamar kost berbasis geolocation dan filter ketersediaan instan",
      "Sistem pemesanan & pembayaran instan dengan virtual account & QRIS",
      "Dashboard pengelola kost untuk kelola okupansi, keluhan, dan inventaris",
      "Notifikasi jatuh tempo sewa via WhatsApp & in-app reminder otomatis",
    ],
    deliverables: [
      "Aplikasi Mobile Pencari Kost (Android & iOS)",
      "Dashboard Pengelola Properti (Web)",
      "Billing & Payment Webhook System",
      "Fitur Chat Terenkripsi Antara Tenant dan Owner",
    ],
    stats: [
      { label: "Kamar Terdaftar", value: "1,200+" },
      { label: "Active Tenants", value: "4,500+" },
      { label: "Booking Conversion", value: "3.8x" },
    ],
    featured: true,
  },
  {
    id: "bendahara-app",
    title: "Bendahara App",
    category: "Mobile App",
    tag: "Finance & Accounting",
    year: "2023",
    client: "Komunitas & Organisasi Regional",
    description:
      "Aplikasi mobile & web untuk manajemen kas masuk, kas keluar, dan pelaporan keuangan organisasi secara transparan dan akuntabel.",
    longDescription:
      "Bendahara App dirancang untuk mengatasi kerumitan pencatatan manual keuangan organisasi, yayasan, dan komunitas. Menawarkan pencatatan transaksi offline-first, pelampiran bukti transaksi digital, multi-wallet balance, serta generator laporan neraca laba-rugi instan.",
    image: "/Ka.png",
    techs: [
      {
        name: "Flutter",
        bg: "bg-cyan-100/80 dark:bg-cyan-900/50",
        text: "text-cyan-800 dark:text-cyan-200",
      },
      {
        name: "JavaScript",
        bg: "bg-yellow-100/80 dark:bg-yellow-900/50",
        text: "text-yellow-800 dark:text-yellow-200",
      },
      {
        name: "Node.js",
        bg: "bg-green-100/80 dark:bg-green-900/50",
        text: "text-green-800 dark:text-green-200",
      },
      {
        name: "SQLite",
        bg: "bg-purple-100/80 dark:bg-purple-900/50",
        text: "text-purple-800 dark:text-purple-200",
      },
    ],
    highlights: [
      "Pencatatan kas masuk & kas keluar harian dengan audit trail terverifikasi",
      "Export otomatis laporan keuangan siap cetak format PDF & Excel",
      "Sinkronisasi offline-first ke cloud database saat terhubung internet",
      "Manajemen multi-kas (Kas Operasional, Kas Proyek, Tabungan)",
    ],
    deliverables: [
      "Mobile App Keuangan Cross-Platform",
      "Web Reporting & Export Engine",
      "Offline Database Sync Protocol",
      "Role Permission & Approval Flow",
    ],
    stats: [
      { label: "Active Organizations", value: "80+" },
      { label: "Monthly Entries", value: "25,000+" },
      { label: "Audit Accuracy", value: "100%" },
    ],
    featured: true,
  },
  {
    id: "portal-bkk",
    title: "Sistem BKK Karir",
    category: "Web Development",
    tag: "Education & Portal",
    year: "2024",
    client: "Bursa Kerja Khusus (BKK) SMK",
    description:
      "Portal bursa kerja khusus dan tracking alumni untuk menghubungkan lulusan vokasi dengan mitra industri nasional.",
    longDescription:
      "Sistem Portal Bursa Kerja Khusus (BKK) memfasilitasi integrasi digital antara sekolah vokasi dan ratusan perusahaan mitra industri. Menyediakan modul pembuatan resume standar industri, matchmaking lowongan kerja, penjadwalan interview, serta kuesioner tracer study alumni.",
    image: "/logobkk.jpg",
    techs: [
      {
        name: "Laravel",
        bg: "bg-red-100/80 dark:bg-red-900/50",
        text: "text-red-800 dark:text-red-200",
      },
      {
        name: "Vue.js",
        bg: "bg-emerald-100/80 dark:bg-emerald-900/50",
        text: "text-emerald-800 dark:text-emerald-200",
      },
      {
        name: "Tailwind CSS",
        bg: "bg-blue-100/80 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-200",
      },
      {
        name: "MySQL",
        bg: "bg-amber-100/80 dark:bg-amber-900/50",
        text: "text-amber-800 dark:text-amber-200",
      },
    ],
    highlights: [
      "Tracer study alumni otomatis dengan laporan statistik serapan kerja",
      "Papan lowongan kerja interaktif dengan kurasi kualifikasi jurusan",
      "Manajemen rekrutmen online (seleksi berkas, tes, dan jadwal wawancara)",
      "Integrasi WhatsApp notification untuk status lamaran pelamar",
    ],
    deliverables: [
      "Web Portal Publik BKK & Alumni",
      "Dashboard Perusahaan Mitra (Employer Portal)",
      "Sistem Tracer Study & Pelaporan Dinas",
      "Modul Pembuat CV Otomatis Siswa",
    ],
    stats: [
      { label: "Mitra Industri", value: "120+" },
      { label: "Alumni Terdaftar", value: "8,500+" },
      { label: "Tingkat Serapan", value: "87%" },
    ],
    featured: false,
  },
  {
    id: "murata-iot",
    title: "Murata Industrial Dashboard",
    category: "Enterprise Solution",
    tag: "Industrial IoT",
    year: "2023",
    client: "PT Murata Manufacturing Partner",
    description:
      "Sistem telemetri IoT dan dashboard visualisasi lini produksi industri secara presisi dan real-time.",
    longDescription:
      "Murata Industrial Dashboard adalah solusi enterprise monitoring lini produksi manufaktur. Menggabungkan sensor telemetri kecepatan tinggi, visualisasi OEE (Overall Equipment Effectiveness), peringatan anomali prediktif, dan pelaporan operasional 24/7.",
    image: "/logo_murata.avif",
    techs: [
      {
        name: "React",
        bg: "bg-sky-100/80 dark:bg-sky-900/50",
        text: "text-sky-800 dark:text-sky-200",
      },
      {
        name: "TypeScript",
        bg: "bg-blue-100/80 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-200",
      },
      {
        name: "Go / Golang",
        bg: "bg-cyan-100/80 dark:bg-cyan-900/50",
        text: "text-cyan-800 dark:text-cyan-200",
      },
      {
        name: "MQTT & InfluxDB",
        bg: "bg-purple-100/80 dark:bg-purple-900/50",
        text: "text-purple-800 dark:text-purple-200",
      },
      {
        name: "Tailwind CSS",
        bg: "bg-teal-100/80 dark:bg-teal-900/50",
        text: "text-teal-800 dark:text-teal-200",
      },
    ],
    highlights: [
      "Visualisasi data telemetri real-time dengan latensi sub-detik melalui WebSockets",
      "Kalkulasi Overall Equipment Effectiveness (OEE) otomatis per mesin",
      "Sistem alarm cerdas via SMS/Telegram saat parameter melewati ambang batas",
      "Penyimpanan time-series data jutaan datapoints per hari",
    ],
    deliverables: [
      "Real-Time Telemetry Web Dashboard",
      "High-Throughput MQTT Data Ingestion Microservice",
      "Industrial Alert & Incident Dispatch Engine",
      "Modul Analisis OEE & Pemeliharaan Preventif",
    ],
    stats: [
      { label: "Sensors Monitored", value: "350+" },
      { label: "Data Rate", value: "50k msg/s" },
      { label: "Downtime Reduction", value: "24%" },
    ],
    featured: false,
  },
  {
    id: "nuris-elearning",
    title: "Nuris E-Learning",
    category: "Web Development",
    tag: "Education & Portal",
    year: "2024",
    client: "Yayasan Nuris Edukasi",
    description:
      "Platform Learning Management System (LMS) modern untuk pembelajaran terstruktur, ujian online anti-curang, dan rapor digital.",
    longDescription:
      "Nuris E-Learning memodernisasi proses belajar-mengajar bagi ribuan santri dan siswa. Dilengkapi modul materi interaktif, ruang pengumpulan tugas bertenggat, computer-based testing (CBT) dengan deteksi tab-switch, serta integrasi nilai otomatis ke buku rapor.",
    image: "/logo_nuris.png",
    techs: [
      {
        name: "Next.js / React",
        bg: "bg-slate-100/80 dark:bg-slate-800",
        text: "text-slate-800 dark:text-slate-200",
      },
      {
        name: "TypeScript",
        bg: "bg-blue-100/80 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-200",
      },
      {
        name: "Laravel API",
        bg: "bg-red-100/80 dark:bg-red-900/50",
        text: "text-red-800 dark:text-red-200",
      },
      {
        name: "PostgreSQL",
        bg: "bg-indigo-100/80 dark:bg-indigo-900/50",
        text: "text-indigo-800 dark:text-indigo-200",
      },
    ],
    highlights: [
      "Computer-Based Test (CBT) dengan anti-fraud security & safe-browser lock",
      "Manajemen materi multimedia (video streaming, PDF, latihan soal interaktif)",
      "Penilaian otomatis dan generator buku rapor kurikulum merdeka",
      "Forum diskusi interaktif guru-siswa dengan notifikasi real-time",
    ],
    deliverables: [
      "Portal Siswa & Pengajar Berbasis Web Responsif",
      "CBT Engine Berkecepatan Tinggi dengan Auto-Grading",
      "Dashboard Manajemen Kurikulum & Rapor Digital",
      "Infrastruktur CDN untuk Streaming Video Materi",
    ],
    stats: [
      { label: "Active Students", value: "3,200+" },
      { label: "Exams Conducted", value: "150+" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
    featured: false,
  },
  {
    id: "genion-site",
    title: "Genion Design System & Portal",
    category: "UI/UX & System",
    tag: "UI/UX & System",
    year: "2024",
    client: "Genion Internal & Client Ecosystem",
    description:
      "Design system komprehensif, arsitektur UI/UX berstandar tinggi, dan portal company identity Genion yang modern serta ultra-responsif.",
    longDescription:
      "Genion Design System & Portal adalah fondasi arsitektur frontend dan identitas visual ekosistem Genion. Menggabungkan sistem token warna adaptif dark/light mode, micro-interactions berbasis GSAP, tipografi presisi, dan pustaka komponen reusable berstandar enterprise.",
    image: "/genion_team.webp",
    techs: [
      {
        name: "React",
        bg: "bg-sky-100/80 dark:bg-sky-900/50",
        text: "text-sky-800 dark:text-sky-200",
      },
      {
        name: "TypeScript",
        bg: "bg-blue-100/80 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-200",
      },
      {
        name: "Tailwind CSS",
        bg: "bg-cyan-100/80 dark:bg-cyan-900/50",
        text: "text-cyan-800 dark:text-cyan-200",
      },
      {
        name: "GSAP",
        bg: "bg-green-100/80 dark:bg-green-900/50",
        text: "text-green-800 dark:text-green-200",
      },
      {
        name: "Figma",
        bg: "bg-purple-100/80 dark:bg-purple-900/50",
        text: "text-purple-800 dark:text-purple-200",
      },
    ],
    highlights: [
      "Atomic design architecture dengan komponen TypeScript modular & accessible",
      "Smooth animations & scroll-triggered micro-interactions menggunakan GSAP",
      "Tema ganda (Dark/Light Mode) dengan kontras warna berstandar WCAG AAA",
      "Optimasi performa dengan Core Web Vitals score 95+",
    ],
    deliverables: [
      "Figma UI Kit & Design Tokens",
      "Reusable React Component Library",
      "Portal Web Interaktif & Dinamis",
      "Panduan Brand Guidelines & Dokumentasi Teknis",
    ],
    stats: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "UI Components", value: "45+" },
      { label: "Design Token Sets", value: "12" },
    ],
    featured: false,
  },
];

export default projects;
