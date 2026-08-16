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

export const GithubIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.09 0 4.41-2.68 5.38-5.24 5.67.41.35.78 1.04.78 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
    </svg>
);
