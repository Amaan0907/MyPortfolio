import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LineSidebar from "./LineSidebar";
import { navItems, profile } from "../data/portfolio";

const scrollToId = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
};

// One accent per section (Overview, About Me, Projects, Contact), chosen for
// contrast against that section's own background rather than a single fixed
// color that would wash out on some of them (e.g. cream-on-cream in Contact).
const SECTION_ACCENTS = ["#fedcbb", "#9a0002", "#fedcbb", "#9a0002"];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [overDarkSection, setOverDarkSection] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const projectsEl = document.querySelector("#projects");
        const sectionEls = navItems.map((item) => document.querySelector(item.href));

        const onScroll = () => {
            setScrolled(window.scrollY > 200);

            if (projectsEl) {
                const rect = projectsEl.getBoundingClientRect();
                const mid = window.innerHeight / 2;
                setOverDarkSection(rect.top <= mid && rect.bottom >= mid);
            }

            // Scroll-spy: whichever section's top has crossed a line near the
            // top of the viewport is the one currently being read.
            const reference = window.innerHeight * 0.35;
            let current = 0;
            sectionEls.forEach((el, i) => {
                if (!el) return;
                if (el.getBoundingClientRect().top <= reference) current = i;
            });
            setActiveSection(current);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] pointer-events-none transition-all duration-500 ease-in-out ${
                    scrolled ? "lg:-translate-y-full lg:opacity-0" : ""
                }`}
            >
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToId("#hero");
                    }}
                    className="six-caps-regular text-3xl tracking-widest pointer-events-auto"
                    data-cursor="grow"
                >
                    AMAAN.
                </a>

                <button
                    className="md:hidden pointer-events-auto flex flex-col gap-1.5 z-50"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-px w-7 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-px w-7 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-px w-7 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>

                <nav className="hidden md:flex items-center gap-10 pointer-events-auto">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            data-cursor="grow"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToId(item.href);
                            }}
                            className="text-sm tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="grow"
                        className="text-sm tracking-[0.15em] uppercase border border-current px-4 py-2 hover:opacity-60 transition-opacity"
                    >
                        GitHub ↗
                    </a>
                </nav>
            </header>

            {/* Desktop proximity side-nav, revealed once the navbar has scrolled out of view */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className={`hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-colors duration-300 ${
                            overDarkSection ? "text-off-white" : "text-black"
                        }`}
                    >
                        <LineSidebar
                            items={navItems.map((i) => i.label)}
                            accentColor={SECTION_ACCENTS[activeSection] ?? "#fedcbb"}
                            textColor="currentColor"
                            markerColor="currentColor"
                            fontSize={0.85}
                            itemGap={16}
                            activeIndex={activeSection}
                            onItemClick={(idx) => scrollToId(navItems[idx].href)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {menuOpen && (
                <motion.div
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToId(item.href);
                                setMenuOpen(false);
                            }}
                            className="six-caps-regular text-6xl text-off-white tracking-wider"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 text-sm tracking-[0.2em] uppercase text-cream"
                    >
                        GitHub ↗
                    </a>
                </motion.div>
            )}
        </>
    );
};

export default Navbar;
