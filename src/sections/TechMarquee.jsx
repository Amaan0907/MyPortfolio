import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Webhook } from "lucide-react";
import {
    SiReact,
    SiJavascript,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiPython,
    SiTailwindcss,
    SiGreensock,
    SiFirebase,
    SiNextdotjs,
    SiGit,
    SiGithub,
    SiGo,
    SiRedis,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { skills } from "../data/portfolio";

const SKILL_ICONS = {
    React: SiReact,
    JavaScript: SiJavascript,
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    MongoDB: SiMongodb,
    Python: SiPython,
    "Tailwind CSS": SiTailwindcss,
    GSAP: SiGreensock,
    Firebase: SiFirebase,
    "Next.js": SiNextdotjs,
    "REST APIs": Webhook,
    Git: SiGit,
    GitHub: SiGithub,
    Go: SiGo,
    Java: FaJava,
    Redis: SiRedis,
};

const MarqueeRow = ({ items, direction = "left", duration = 28, mode = "text" }) => {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const ctx = gsap.context(() => {
            const width = track.scrollWidth / 2;
            const fromX = direction === "left" ? 0 : -width;
            const toX = direction === "left" ? -width : 0;

            gsap.set(track, { x: fromX });
            const tween = gsap.to(track, {
                x: toX,
                duration,
                ease: "none",
                repeat: -1,
            });

            const handleEnter = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6, ease: "power2.out" });
            const handleLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.out" });

            track.addEventListener("mouseenter", handleEnter);
            track.addEventListener("mouseleave", handleLeave);

            return () => {
                track.removeEventListener("mouseenter", handleEnter);
                track.removeEventListener("mouseleave", handleLeave);
            };
        }, trackRef);

        return () => ctx.revert();
    }, [direction, duration]);

    const doubled = [...items, ...items];

    return (
        <div className="overflow-hidden">
            <div ref={trackRef} className="flex w-max whitespace-nowrap">
                {doubled.map((skill, i) => {
                    const Icon = SKILL_ICONS[skill];
                    return (
                        <span
                            key={`${skill}-${i}`}
                            className={`leading-none text-off-white/90 px-8 flex items-center ${
                                mode === "icon" ? "text-[6vw] md:text-[2.6vw]" : "six-caps-regular text-[7vw] md:text-[3.2vw] tracking-wide"
                            }`}
                        >
                            {mode === "icon" && Icon ? (
                                <>
                                    <Icon aria-hidden="true" />
                                    <span className="sr-only">{skill}</span>
                                </>
                            ) : (
                                skill
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

const TechMarquee = () => {
    const reversedSkills = [...skills].reverse();

    return (
        <section className="relative w-full bg-maroon py-6 md:py-8 overflow-hidden border-y border-off-white/10 flex flex-col gap-3 md:gap-4">
            <MarqueeRow items={skills} direction="left" duration={28} mode="text" />
            <MarqueeRow items={reversedSkills} direction="right" duration={28} mode="icon" />
        </section>
    );
};

export default TechMarquee;
