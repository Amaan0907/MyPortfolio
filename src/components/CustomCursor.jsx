import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

        const handleMove = (e) => {
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
        };

        const growTargets = "a, button, [data-cursor='grow']";
        const handleOver = (e) => {
            if (e.target.closest(growTargets)) {
                gsap.to(ring, { scale: 2.4, duration: 0.3, ease: "power3.out" });
                gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
            }
        };
        const handleOut = (e) => {
            if (e.target.closest(growTargets)) {
                gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
                gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
            }
        };

        window.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseover", handleOver);
        document.addEventListener("mouseout", handleOut);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseover", handleOver);
            document.removeEventListener("mouseout", handleOut);
        };
    }, []);

    return (
        <div className="hidden md:block">
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-off-white pointer-events-none z-[9999] mix-blend-difference"
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-off-white pointer-events-none z-[9999] mix-blend-difference"
            />
        </div>
    );
};

export default CustomCursor;
