import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "../components/MagneticButton";
import SplitReveal from "../components/SplitReveal";
import OptionWheel from "../components/OptionWheel";
import { profile } from "../data/portfolio";

const contactMethods = [
    { label: "Gmail", href: `mailto:${profile.email}`, external: false },
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "WhatsApp", href: `https://wa.me/${profile.whatsapp}`, external: true },
    { label: "Instagram", href: profile.instagram, external: true },
];

const Contact = () => {
    const [open, setOpen] = useState(false);

    const handleSelect = (index) => {
        const method = contactMethods[index];
        if (!method) return;
        if (method.external) {
            window.open(method.href, "_blank", "noopener,noreferrer");
        } else {
            window.location.href = method.href;
        }
    };

    return (
        <section id="contact" className="relative w-full bg-cream text-ink px-6 md:px-16 py-28 md:py-40 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                <span className="text-[11px] tracking-[0.3em] uppercase text-maroon">03 / Contact</span>

                <SplitReveal
                    as="h2"
                    className="six-caps-regular text-[16vw] md:text-[8vw] leading-[0.85] tracking-wide mt-4"
                >
                    Let's build something great
                </SplitReveal>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-6 text-lg text-ink/60 max-w-xl mx-auto"
                >
                    Have a project in mind, an opportunity, or just want to talk tech? My inbox is always open.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="mt-10 flex flex-col items-center"
                >
                    <MagneticButton
                        as="button"
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        data-cursor="grow"
                        className="six-caps-regular text-[8vw] md:text-[3vw] tracking-wide bg-maroon text-off-white px-10 md:px-14 py-5 md:py-7 rounded-full"
                    >
                        {open ? "Choose a Way ↓" : "Say Hello ↗"}
                    </MagneticButton>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full max-w-xs overflow-hidden"
                            >
                                <div className="mt-8 h-52.5 relative" data-lenis-prevent>
                                    <OptionWheel
                                        items={contactMethods.map((m) => m.label)}
                                        defaultSelected={0}
                                        onSelect={(index) => handleSelect(index)}
                                        side="left"
                                        fontSize={2}
                                        spacing={1.3}
                                        inset={0}
                                        curve={0.6}
                                        tilt={10}
                                        textColor="rgba(18,10,8,0.35)"
                                        activeColor="#9a0002"
                                        className="mx-auto"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-14 flex items-center justify-center gap-8 text-sm tracking-[0.15em] uppercase">
                    <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="grow" className="hover:text-maroon transition-colors">
                        GitHub
                    </a>
                    <span className="w-1 h-1 rounded-full bg-ink/30" />
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="grow" className="hover:text-maroon transition-colors">
                        LinkedIn
                    </a>
                    <span className="w-1 h-1 rounded-full bg-ink/30" />
                    <a href={profile.instagram} target="_blank" rel="noreferrer" data-cursor="grow" className="hover:text-maroon transition-colors">
                        Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
