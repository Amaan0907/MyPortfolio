import { motion } from "motion/react";
import MagneticButton from "../components/MagneticButton";
import SplitReveal from "../components/SplitReveal";
import { profile } from "../data/portfolio";

const Contact = () => {
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
                    className="mt-10"
                >
                    <MagneticButton
                        as="a"
                        href={`mailto:${profile.email}`}
                        data-cursor="grow"
                        className="six-caps-regular text-[8vw] md:text-[3vw] tracking-wide bg-maroon text-off-white px-10 md:px-14 py-5 md:py-7 rounded-full"
                    >
                        Say Hello ↗
                    </MagneticButton>
                </motion.div>

                <div className="mt-14 flex items-center justify-center gap-8 text-sm tracking-[0.15em] uppercase">
                    <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="grow" className="hover:text-maroon transition-colors">
                        GitHub
                    </a>
                    <span className="w-1 h-1 rounded-full bg-ink/30" />
                    <a href={`mailto:${profile.email}`} data-cursor="grow" className="hover:text-maroon transition-colors">
                        Email
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
