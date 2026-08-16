import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import AuroraCycleText from "../animations/AuroraCycleText";
import TextAnimator from "../animations/TextAnimator";
import MagneticButton from "../components/MagneticButton";
import { profile } from "../data/portfolio";

const Hero = () => {
    const sectionRef = useRef(null);
    const creamRef = useRef(null);
    const maroonRef = useRef(null);
    const nameRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(creamRef.current, {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
            gsap.to(maroonRef.current, {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(contentRef.current, {
                opacity: 0.15,
                yPercent: -6,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            if (window.matchMedia("(pointer: fine)").matches) {
                const el = nameRef.current;
                if (el) {
                    const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3.out" });
                    const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3.out" });

                    const handleMove = (e) => {
                        const rect = maroonRef.current.getBoundingClientRect();
                        const px = (e.clientX - rect.left) / rect.width - 0.5;
                        const py = (e.clientY - rect.top) / rect.height - 0.5;
                        rotateY(px * 10);
                        rotateX(py * -10);
                    };
                    const handleLeave = () => {
                        rotateX(0);
                        rotateY(0);
                    };

                    maroonRef.current.style.perspective = "1200px";
                    maroonRef.current.addEventListener("mousemove", handleMove);
                    maroonRef.current.addEventListener("mouseleave", handleLeave);

                    return () => {
                        maroonRef.current?.removeEventListener("mousemove", handleMove);
                        maroonRef.current?.removeEventListener("mouseleave", handleLeave);
                    };
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" ref={sectionRef} className="relative w-full h-screen overflow-hidden">
            <div ref={contentRef} className="contents">
            <div ref={creamRef} className="bg-cream h-[42%] flex items-end justify-between px-6 md:px-16 pb-6 will-change-transform">
                <div />
                <AuroraCycleText
                    words={[
                        { lead: "Let's", accent: "Build" },
                        { lead: "Ship", accent: "Beautiful" },
                    ]}
                    wrapperClassName="shrink-0"
                    className="six-caps-regular text-[18vw] md:text-[10vw] leading-[0.85] tracking-wider text-right"
                />
            </div>

            <div ref={maroonRef} className="bg-maroon h-[58%] flex flex-col justify-center px-6 md:px-16 will-change-transform relative">
                <div ref={nameRef} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                    <TextAnimator
                        text="Amaan-Full Stack Developer"
                        className="text-off-white six-caps-regular text-[22vw] md:text-[13vw] leading-[0.82] tracking-wider"
                    />
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-4 md:mt-6 max-w-xl text-off-white/80 text-sm md:text-base tracking-wide"
                >
                    {profile.tagline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-8 flex flex-wrap items-center gap-4"
                >
                    <MagneticButton
                        as="a"
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        data-cursor="grow"
                        className="bg-cream text-ink px-7 py-3 text-sm tracking-[0.15em] uppercase rounded-full"
                    >
                        View Work
                    </MagneticButton>
                    <MagneticButton
                        as="a"
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="grow"
                        className="border border-off-white/40 text-off-white px-7 py-3 text-sm tracking-[0.15em] uppercase rounded-full hover:border-off-white transition-colors"
                    >
                        GitHub ↗
                    </MagneticButton>
                </motion.div>
            </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-5 right-6 md:right-16 flex items-center gap-2 text-off-white/60 text-[11px] tracking-[0.25em] uppercase"
            >
                <span className="block w-8 h-px bg-off-white/40" />
                Scroll
            </motion.div>
        </section>
    );
};

export default Hero;
