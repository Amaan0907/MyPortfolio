import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { skills } from "../data/portfolio";

const TechMarquee = () => {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const ctx = gsap.context(() => {
            const width = track.scrollWidth / 2;
            const tween = gsap.to(track, {
                x: -width,
                duration: 28,
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
    }, []);

    const doubled = [...skills, ...skills];

    return (
        <section className="relative w-full bg-maroon py-8 md:py-10 overflow-hidden border-y border-off-white/10">
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
        </section>
    );
};

export default TechMarquee;
