import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitText from "./animata/text/split-text";

const LOAD_TEXT = "AMAAN";

const Preloader = ({ onComplete }) => {
    const wrapRef = useRef(null);
    const percentRef = useRef(null);
    const barRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const counter = { value: 0 };
        let lastIndex = -1;

        const tl = gsap.timeline();

        tl.to(counter, {
            value: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
                const progress = counter.value / 100;

                if (percentRef.current) {
                    percentRef.current.textContent = String(Math.floor(counter.value)).padStart(3, "0");
                }

                const index = Math.min(LOAD_TEXT.length - 1, Math.round(progress * (LOAD_TEXT.length - 1)));
                if (index !== lastIndex) {
                    lastIndex = index;
                    setActiveIndex(index);
                }

                if (barRef.current) {
                    barRef.current.style.transform = `scaleX(${progress})`;
                }
            },
            onComplete: () => {
                setActiveIndex(undefined);
            },
        }).to(
            wrapRef.current,
            {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => {
                    setDone(true);
                    onComplete?.();
                },
            },
            "+=1"
        );

        return () => tl.kill();
    }, [onComplete]);

    if (done) return null;

    return (
        <div
            ref={wrapRef}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-ink text-off-white"
        >
            <SplitText
                text={LOAD_TEXT}
                activeIndex={activeIndex}
                className="six-caps-regular text-cream text-[16vw] tracking-wider md:text-[10vw] lg:text-[9vw]"
            />
            <div className="mt-6 w-[40vw] max-w-xs h-px bg-white/15 overflow-hidden">
                <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-maroon" />
            </div>
            <p className="mt-4 flex items-center gap-1 text-[11px] tracking-[0.3em] uppercase text-off-white/50">
                Loading
                <span ref={percentRef} className="tabular-nums text-off-white/80">
                    000
                </span>
                %
            </p>
        </div>
    );
};

export default Preloader;
