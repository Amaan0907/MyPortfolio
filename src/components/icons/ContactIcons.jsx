// Minimal 24x24 stroke icons (2px, round caps/joins) matching lucide-react's
// style, kept local since lucide dropped its brand icons (LinkedIn, Instagram)
// and has nothing WhatsApp-shaped.
const base = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export const MailIcon = (props) => (
    <svg {...base} {...props}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
    </svg>
);

export const WhatsAppIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M3 21l1.65-4.95A8 8 0 1 1 9 19.5L3 21z" />
        <path d="M8.5 9.7c0-.6.5-1.2 1.1-1.2h.6c.3 0 .6.2.7.5l.7 1.6c.1.3.1.6-.1.8l-.6.7c.5 1.1 1.4 2 2.5 2.5l.7-.6c.2-.2.5-.2.8-.1l1.6.7c.3.1.5.4.5.7v.6c0 .6-.6 1.1-1.2 1.1-3.9 0-7-3.1-7-7z" />
    </svg>
);

export const LinkedInIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export const InstagramIcon = (props) => (
    <svg {...base} {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);
