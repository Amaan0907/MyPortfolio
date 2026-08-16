import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { skills } from "../data/portfolio";

const MarqueeRow = ({ items, direction = "left", duration = 28 }) => {
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
                {doubled.map((skill, i) => (
                    <span
                        key={`${skill}-${i}`}
                        className="six-caps-regular text-[7vw] md:text-[3.2vw] leading-none tracking-wide text-off-white/90 px-8 flex items-center gap-8"
                    >
                        {skill}
                        <span className="text-cream text-3xl md:text-2xl">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

const TechMarquee = () => {
    const reversedSkills = [...skills].reverse();

    return (
        <section className="relative w-full bg-maroon py-6 md:py-8 overflow-hidden border-y border-off-white/10 flex flex-col gap-3 md:gap-4">
            <MarqueeRow items={skills} direction="left" duration={28} />
            <MarqueeRow items={reversedSkills} direction="right" duration={28} />
        </section>
    );
};

export default TechMarquee;
