const Footer = () => (
    <footer className="w-full bg-cream text-ink px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-ink/10">
        <p className="text-xs tracking-[0.15em] uppercase text-ink/50">
            © {new Date().getFullYear()} Amaan. Designed &amp; built from scratch.
        </p>
        
    </footer>
);

export default Footer;
