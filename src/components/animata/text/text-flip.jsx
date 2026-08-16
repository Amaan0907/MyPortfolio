import { useEffect, useRef } from "react";

import { cn } from "../../../lib/utils";

// Ported from https://animata.design/docs/text/text-flip (shadcn registry).
// Generalized to accept its own `words` instead of the hardcoded demo list;
// the flip keyframes assume a 5-item stack (last word == first, for a
// seamless loop) so callers should pass words in that shape.
export default function TextFlip({ words, className, wordClassName }) {
    const stackRef = useRef(null);

    useEffect(() => {
        if (!stackRef.current) return;
        let maxHeight = 0;
        words.forEach((word) => {
            const span = document.createElement("span");
            span.className = "absolute opacity-0";
            span.textContent = word;
            stackRef.current.appendChild(span);
            const height = span.offsetHeight;
            stackRef.current.removeChild(span);
            if (height > maxHeight) maxHeight = height;
        });
        stackRef.current.style.height = `${maxHeight}px`;
    }, [words]);

    return (
        <div ref={stackRef} className={cn("flex flex-col overflow-hidden", className)}>
            {words.map((word, index) => (
                <span key={index} className={cn("animate-flip-words", wordClassName)}>
                    {word}
                </span>
            ))}
        </div>
    );
}
