import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const rafCallback = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        return () => {
            window.removeEventListener("load", onLoad);
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
        };
    }, []);

    return children;
};

export default SmoothScroll;
