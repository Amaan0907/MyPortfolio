import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "../components/MagneticButton";
import SplitReveal from "../components/SplitReveal";
import OptionWheel from "../components/OptionWheel";
import { MailIcon, WhatsAppIcon, LinkedInIcon, InstagramIcon } from "../components/icons/ContactIcons";
import { profile } from "../data/portfolio";

const contactMethods = [
    { label: "Say Hello", icon: MailIcon, href: `mailto:${profile.email}`, external: false },
    { label: "Let's Talk", icon: WhatsAppIcon, href: `https://wa.me/${profile.whatsapp}`, external: true },
    { label: "View Profile", icon: LinkedInIcon, href: profile.linkedin, external: true },
    { label: "Follow Along", icon: InstagramIcon, href: profile.instagram, external: true },
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
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <motion.div layout transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}>
                        <MagneticButton
                            as="button"
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            data-cursor="grow"
                            className="six-caps-regular text-[8vw] md:text-[3vw] tracking-wide bg-maroon text-off-white px-10 md:px-14 py-5 md:py-7 rounded-full shrink-0 overflow-hidden"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={open ? "close" : "open"}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block"
                                >
                                    {open ? "Choose a Way →" : "Say Hello ↗"}
                                </motion.span>
                            </AnimatePresence>
                        </MagneticButton>
                    </motion.div>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, x: -16 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -16 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="w-72 h-52.5 relative"
                                data-lenis-prevent
                            >
                                <OptionWheel
                                    items={contactMethods.map((m) => ({ label: m.label, icon: m.icon }))}
                                    defaultSelected={0}
                                    onSelect={(index) => handleSelect(index)}
                                    side="left"
                                    fontSize={1.6}
                                    spacing={1.5}
                                    inset={0}
                                    curve={0.6}
                                    tilt={10}
                                    textColor="rgba(18,10,8,0.35)"
                                    activeColor="#9a0002"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    layout
                    transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                    className="mt-14 flex items-center justify-center text-sm tracking-[0.15em] uppercase"
                >
                    <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="grow" className="hover:text-maroon transition-colors">
                        GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
