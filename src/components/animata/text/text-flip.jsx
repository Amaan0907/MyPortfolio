import { useEffect, useRef } from "react";

import { cn } from "../../../lib/utils";

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
