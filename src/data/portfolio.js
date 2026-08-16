export const profile = {
    name: "Amaan",
    fullTitle: "Full Stack Developer",
    tagline: "Computer Science student specializing in AI/ML, building full-stack applications and exploring the world of machine learning.",
    github: "https://github.com/Amaan0907",
    email: "mohdamaan00907@gmail.com",
    location: "India",
    stats: [
        { label: "Public Repos", value: "10+" },
        { label: "Years Coding", value: "3+" },
        { label: "Tech Stack", value: "12+" },
        { label: "Coffee / Day", value: "∞" },
    ],
};

export const skills = [
    "React", "JavaScript", "Node.js", "Express", "MongoDB",
    "Python", "Tailwind CSS", "GSAP", "Firebase", "Next.js",
    "REST APIs", "Git & GitHub",
];

export const projects = [
    {
        id: "interviewiq",
        index: "01",
        title: "InterviewIQ",
        subtitle: "AI Interview Preparation Platform",
        description:
            "A full-stack AI platform that gives candidates resume analysis and mock-interview coaching, powered by Google's Generative AI. Includes a progress dashboard and secure JWT authentication.",
        stack: ["React 19", "Vite", "Node.js", "Express", "MongoDB", "Gemini AI", "JWT"],
        year: "2026",
        github: "https://github.com/Amaan0907/GenAI_and_Full_Stack_Project",
        live: "https://interviewiq-psi.vercel.app",
        color: "maroon",
    },
    {
        id: "video-backend",
        index: "02",
        title: "StreamForge",
        subtitle: "Production Video-Hosting Backend",
        description:
            "A robust, production-grade backend for a YouTube-style video platform. Handles auth with access/refresh tokens, Cloudinary media pipelines, and rich data models for videos, playlists and subscriptions.",
        stack: ["Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Multer"],
        year: "2026",
        github: "https://github.com/Amaan0907/Backend_Project",
        live: null,
        color: "ink",
    },
    {
        id: "amiram-neuro-care",
        index: "03",
        title: "Amiram Neuro Care",
        subtitle: "Client Website — Neurosurgery Practice",
        description:
            "A client-facing medical practice site built to showcase a neurosurgeon's credentials, services and patient testimonials, with a built-in consultation booking flow.",
        stack: ["Next.js", "React", "Vercel"],
        year: "2026",
        github: "https://github.com/Amaan0907/doc",
        live: "https://doc-plum-three.vercel.app",
        color: "cream",
    },
    {
        id: "voya",
        index: "04",
        title: "Voya",
        subtitle: "Travel Companion Web App",
        description:
            "A travel planning app with Firebase-backed authentication and a React Router driven flow, styled end-to-end with Tailwind CSS.",
        stack: ["React", "Firebase", "React Router", "Tailwind CSS"],
        year: "2026",
        github: "https://github.com/Amaan0907/Voya",
        live: null,
        color: "maroon",
    },
    {
        id: "insurance-predictor",
        index: "05",
        title: "Insurance Charge Predictor",
        subtitle: "Machine Learning Regression Model",
        description:
            "A machine-learning model trained to predict individual medical insurance charges from demographic and health data, built and evaluated in a Jupyter notebook.",
        stack: ["Python", "Pandas", "scikit-learn", "Jupyter"],
        year: "2025",
        github: "https://github.com/Amaan0907/Insurance_Charge_Predictor",
        live: null,
        color: "ink",
    },
    {
        id: "probability-simulator",
        index: "06",
        title: "Probability-Guided Guessing Simulator",
        subtitle: "Python CLI Application",
        description:
            "A modular, scalable number-guessing engine with a probabilistic core, argparse-driven CLI, JSON/INI config support, structured logging, unit tests and a plugin-ready architecture.",
        stack: ["Python", "argparse", "Unit Testing"],
        year: "2025",
        github: "https://github.com/Amaan0907/Probability-Guided-Number-Guessing-Simulator",
        live: null,
        color: "cream",
    },
];

export const navItems = [
    { label: "Overview", href: "#hero" },
    { label: "About Me", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];
