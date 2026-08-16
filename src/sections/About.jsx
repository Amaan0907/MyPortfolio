import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "../components/SplitReveal";
import TextFlip from "../components/animata/text/text-flip";
import { profile } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

// TextFlip's keyframes are built for a 5-item stack (last === first, for a
// seamless loop), so the first word is repeated at the end.
const CORNER_WORDS = ["love", "fantastic", "awesome", "fire", "love"];

// Splits plain text into word spans so the scroll-linked highlight below can
// fade each one from dim to full ink independently.
const renderWords = (text) =>
    text.split(" ").flatMap((word, i, arr) => [
        <span key={i} className="about-word">
            {word}
        </span>,
        i < arr.length - 1 ? " " : null,
    ]);

const About = () => {
    const statsRef = useRef(null);
    const photoWrapRef = useRef(null);
    const colorLayerRef = useRef(null);
    const paragraph1Ref = useRef(null);
    const paragraph2Ref = useRef(null);
    const [imgError, setImgError] = useState(false);
    const [hovering, setHovering] = useState(false);

    const handlePhotoMove = (e) => {
        const el = colorLayerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const mask = `radial-gradient(120px circle at ${x}px ${y}px, black 55%, transparent 100%)`;
        el.style.maskImage = mask;
        el.style.webkitMaskImage = mask;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-item", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                },
            });

            gsap.fromTo(
                photoWrapRef.current,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: photoWrapRef.current,
                        start: "top 80%",
                    },
                }
            );

            // As each paragraph scrolls through, its words darken from a dim
            // ink to full black in sequence, rather than appearing all at once.
            [paragraph1Ref, paragraph2Ref].forEach((ref) => {
                const words = ref.current?.querySelectorAll(".about-word");
                if (!words?.length) return;
                gsap.fromTo(
                    words,
                    { color: "rgba(18,10,8,0.25)" },
                    {
                        color: "rgba(18,10,8,1)",
                        stagger: 0.02,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 85%",
                            end: "bottom 55%",
                            scrub: 0.5,
                        },
                    }
                );
            });
        }, statsRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="relative w-full bg-off-white text-ink px-6 md:px-16 py-28 md:py-36">
            <div className="max-w-6xl mx-auto">
                <span className="text-[11px] tracking-[0.3em] uppercase text-maroon">01 / About</span>

                <SplitReveal
                    as="h2"
                    className="six-caps-regular text-[14vw] md:text-[6vw] leading-[0.9] tracking-wide mt-4 max-w-4xl"
                >
                    Building thoughtful software, one line at a time.
                </SplitReveal>

                <div className="grid md:grid-cols-[320px_1fr] gap-10 md:gap-16 mt-14 md:mt-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8 }}
                        className="relative mx-auto md:mx-0 w-full max-w-[320px]"
                    >
                        <div
                            ref={photoWrapRef}
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            onMouseMove={handlePhotoMove}
                            className="relative aspect-4/5 w-full overflow-hidden rounded-2xl "
                        >
                            {!imgError ? (
                                <>
                                    <img
                                        src="/images/amaan.jpg"
                                        alt="Amaan — Full Stack Developer"
                                        onError={() => setImgError(true)}
                                        className="h-full w-full object-cover grayscale"
                                    />
                                    {/* Color layer, revealed only within a radius around the cursor via a following mask. */}
                                    <img
                                        ref={colorLayerRef}
                                        src="/images/amaan.jpg"
                                        alt=""
                                        aria-hidden="true"
                                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
                                            hovering ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                </>
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-maroon to-[#4a0001]">
                                    <span className="six-caps-regular text-[9rem] leading-none text-off-white/90">A</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-4 -right-4 flex items-center gap-1.5 bg-cream text-ink text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-ink/10">
                            <span>Coding is</span>
                            <TextFlip words={CORNER_WORDS} className="text-maroon text-[13px] " />
                        </div>
                    </motion.div>

                    <div className="grid gap-8 sm:grid-cols-2">
                        <motion.p
                            ref={paragraph1Ref}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.8 }}
                            className="text-lg md:text-xl leading-relaxed text-ink/25"
                        >
                            {renderWords(
                                "I'm Amaan — a Computer Science student who specializes in AI/ML and spends most of my time turning ideas into full-stack products. From crafting pixel-perfect interfaces in React to shipping production-ready backends with Node.js and MongoDB, I care about the details that make software feel effortless to use."
                            )}
                        </motion.p>

                        <motion.p
                            ref={paragraph2Ref}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="text-lg md:text-xl leading-relaxed text-ink/25"
                        >
                            {renderWords(
                                "Outside of coursework, I build things I'm curious about — an AI interview coach, a video-hosting backend, machine-learning models that predict real-world numbers. Every project on this site is public, shipped, and on"
                            )}{" "}
                            <a href={profile.github} target="_blank" rel="noreferrer" className="text-maroon underline underline-offset-4">
                                GitHub
                            </a>
                            .
                        </motion.p>
                    </div>
                </div>

                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-ink/10 pt-10">
                    {profile.stats.map((stat) => (
                        <div key={stat.label} className="stat-item">
                            <p className="six-caps-regular text-6xl md:text-7xl text-maroon leading-none">{stat.value}</p>
                            <p className="mt-2 text-xs tracking-[0.2em] uppercase text-ink/50">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
