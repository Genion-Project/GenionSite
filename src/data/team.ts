export interface TeamMember {
  name: string;
  role: string;
  description: string;
  skills: string[];
  initials: string;
  color: string;
  image: string;
  linkedin: string;
  instagram?: string;
  twitter?: string;
  email: string;
  featured?: boolean;
}

export const coreTeam: TeamMember[] = [
  {
    name: "Nafil Habibi Mulyadi",
    role: "Chief Innovation Officer & Founder",
    description: "Visioner di balik Genion, Menghubungkan Relasi dan Teknologi untuk Masa Depan Digital, dengan +3 tahun pengalaman di industri teknologi.",
    skills: ["Leadership", "Full Stack", "Cloud Architecture", "Machine Learning", "Robotic"],
    initials: "NHM",
    color: "from-blue-500 to-indigo-600",
    image: "/nafil.jpeg",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "nafil@genion.com",
    featured: true
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Muhammad Yusuf", 
    role: "Fullstack Developer",
    description: "Expert teknologi yang menghadirkan solusi inovatif terdepan dengan fokus pada user experience",
    skills: ["Laravel", "PHP", "PostgreSQL", "Figma", "React", "Python", "Tailwind CSS", "Node.js", "Express.js"],
    initials: "YF",
    color: "from-cyan-500 to-blue-600",
    image: "/yusuf.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammad-yusuf-24892236a",
    instagram: "https://www.instagram.com/hdmmyusuf",
    twitter: "#",
    email: "hahayusuf692@gmail.com"
  },
  {
    name: "Boy Cahya Madinah",
    role: "Quality Control",
    description: "Berpengalaman di bidang pengembangan perangkat lunak. Terampil dalam melakukan review, pengujian, dan memastikan setiap produk memenuhi standar kualitas memadai.",
    skills: ["Testing", "DevTools", "GitHub", "Figma", "Tailwind CSS"],
    initials: "BCM",
    color: "from-yellow-500 to-orange-600",
    image: "/boy.jpeg",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "boy@genion.com"
  },
  {
    name: "Stanly Andrian Pratama",
    role: "Cloud Engineer",
    description: "Specialist dalam arsitektur cloud, skalabilitas infrastruktur, dan database optimization",
    skills: ["AWS Cloud", "Cloud Architecture", "Docker", "MySQL", "C++", "Rust"],
    initials: "SAP",
    color: "from-cyan-500 to-blue-600",
    image: "/stanly.png",
    linkedin: "#",
    instagram: "instagram.com/0xtrynafindstan",
    twitter: "#",
    email: "stanlyandrian12@gmail.com"
  },
  {
    name: "Mifzal Arif",
    role: "UI/UX Designer",
    description: "Design Tak Hanya soal bagus, tapi juga soal fungsi dan pengalaman pengguna",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    initials: "JS",
    color: "from-pink-500 to-rose-600",
    image: "/mifzal.jpeg",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "#"
  },
  {
    name: "Ammar Ashim Hadi",
    role: "Frontend Developer",
    description: "Creating beautiful and intuitive user experiences",
    skills: ["Javascript", "Figma", "Tailwind CSS"],
    initials: "A",
    color: "from-emerald-500 to-green-600",
    image: "/ammar.jpeg",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "#"
  },
  {
    name: "Rafa Silmi Abshar",
    role: "UI/UX Designer",
    description: "Make a design that is not only beautiful but also functional",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    initials: "RSA",
    color: "from-pink-500 to-rose-600",
    image: "/rafa.png",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "#"
  },
  {
    name: "Ramadanu",
    role: "Full Stack Developer",
    description: "turning logic into reality through code",
    skills: ["Javascript", "Node.js", "MongoDB", "AWS"],
    initials: "?",
    color: "from-emerald-500 to-green-600",
    image: "/ramadanu.png",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "#"
  },
  {
    name: "Rizky Bima Putra Aini",
    role: "Frontend Developer",
    description: "Mewujudkan Pemikiran Digital melalui Kode Kreatif",
    skills: ["Javascript", "Figma", "Tailwind CSS"],
    initials: "RK",
    color: "from-emerald-500 to-green-600",
    image: "/bima.jpeg",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "#"
  },
  {
    name: "Yusnaldi Rafiq",
    role: "Frontend Developer",
    description: "Improver of user-centric digital experiences",
    skills: ["Javascript", "Figma", "Tailwind CSS"],
    initials: "YR",
    color: "from-emerald-500 to-green-600",
    image: "/yusnaldi.jpeg",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "#"
  },
  {
    name: "Chacha Pelangi Parawansha",
    role: "Digital Marketing Specialist", 
    description: "Ahli pemasaran digital yang mengoptimalkan visibilitas brand online dengan strategi data-driven",
    skills: ["Figma", "Canva", "Content Strategy"],
    initials: "CP",
    color: "from-teal-500 to-lime-600",
    image: "/chacha.png",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
    email: "chacha@genion.com"
  }
];

export const allMembers: TeamMember[] = [...coreTeam, ...teamMembers];
