import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }) => {
    const wrapRef = useRef(null);
    const countRef = useRef(null);
    const barRef = useRef(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const counter = { value: 0 };
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(wrapRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 0.2,
                    onComplete: () => {
                        setDone(true);
                        onComplete?.();
                    },
                });
            },
        });

        tl.to(counter, {
            value: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.textContent = String(Math.floor(counter.value)).padStart(3, "0");
                }
            },
        }).to(
            barRef.current,
            { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
            "<"
        );

        return () => tl.kill();
    }, [onComplete]);

    if (done) return null;

    return (
        <div
            ref={wrapRef}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-ink text-off-white"
        >
            <span
                ref={countRef}
                className="six-caps-regular text-[22vw] leading-none tracking-wider text-cream"
            >
                000
            </span>
            <div className="mt-6 w-[40vw] max-w-xs h-px bg-white/15 overflow-hidden">
                <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-maroon" />
            </div>
            <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-off-white/50">
                Loading Portfolio
            </p>
        </div>
    );
};

export default Preloader;
