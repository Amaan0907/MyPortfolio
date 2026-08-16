import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const AuroraCycleText = ({ words = [], interval = 2600, className = "", wrapperClassName = "" }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (words.length < 2) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
        return () => clearInterval(id);
    }, [words.length, interval]);

    const { lead, accent } = words[index];

    return (
        <span className={`inline-grid overflow-hidden ${wrapperClassName}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={`${lead}-${accent}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className={`[grid-area:1/1] ${className}`}
                >
                    <span className="text-ink">{lead} </span>
                    <span className="text-aurora">{accent}</span>
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default AuroraCycleText;
