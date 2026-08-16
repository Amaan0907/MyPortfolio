import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

const MagneticButton = ({ children, className = "", as: Tag = "button", strength = 0.4, ...props }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            xTo(relX * strength);
            yTo(relY * strength);
        };

        const handleLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }, [strength]);

    return (
        <Tag ref={ref} className={clsx("inline-flex items-center justify-center will-change-transform", className)} {...props}>
            {children}
        </Tag>
    );
};

export default MagneticButton;
