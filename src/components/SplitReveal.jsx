import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SplitReveal = ({ as: Tag = "h2", children, className = "", type = "lines", start = "top 85%", delay = 0 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let split;
        const ctx = gsap.context(() => {
            split = SplitText.create(el, {
                type,
                mask: type,
                linesClass: "split-line",
            });

            const targets = split.lines?.length ? split.lines : split.words?.length ? split.words : split.chars;

            gsap.from(targets, {
                yPercent: 110,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.06,
                delay,
                scrollTrigger: {
                    trigger: el,
                    start,
                },
            });
        }, ref);

        return () => {
            ctx.revert();
            split?.revert();
        };
    }, [type, start, delay]);

    return (
        <Tag ref={ref} className={clsx(className)}>
            {children}
        </Tag>
    );
};

export default SplitReveal;
