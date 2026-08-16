import { useRef, useState } from "react";

import { cn } from "../../../lib/utils";

// Ported from https://animata.design/docs/text/split-text (shadcn registry).
// Adapted to also accept a controlled `activeIndex` (e.g. driven by load
// progress) instead of only reacting to hover.
export default function SplitText({ text = "ANIMATA", className, activeIndex: controlledIndex }) {
    const [hoverIndex, setHoverIndex] = useState(undefined);
    const timer = useRef(undefined);

    const isControlled = controlledIndex !== undefined;
    const activeIndex = isControlled ? controlledIndex : hoverIndex;

    const letterClassName =
        "inline h-1/2 select-none overflow-y-hidden leading-none transition-transform duration-300 ease-out whitespace-pre";

    return (
        <div
            className={cn(
                "relative mx-auto text-4xl font-black uppercase text-yellow-500 md:text-5xl lg:text-9xl",
                className
            )}
        >
            {/** hidden text so that we maintain the size for any text */}
            <div className="invisible leading-none">{text}</div>
            <div className="absolute top-0 flex h-full">
                {text.split("").map((letter, index) => (
                    <div
                        onMouseEnter={() => {
                            if (isControlled) return;
                            if (timer.current) clearTimeout(timer.current);
                            setHoverIndex(index);
                        }}
                        onMouseLeave={() => {
                            if (isControlled) return;
                            timer.current = setTimeout(() => setHoverIndex(undefined));
                        }}
                        key={`${letter}-${index}`}
                        className="relative inline-flex h-full flex-col leading-none"
                        aria-hidden
                    >
                        {/** top half */}
                        <span
                            className={cn(letterClassName, {
                                "-translate-y-5": index === activeIndex,
                                "-translate-y-3":
                                    activeIndex !== undefined &&
                                    (index === activeIndex - 1 || index === activeIndex + 1),
                                "-translate-y-1":
                                    activeIndex !== undefined &&
                                    (index === activeIndex - 2 || index === activeIndex + 2),
                            })}
                        >
                            {letter}
                        </span>

                        {/** bottom half */}
                        <span
                            className={cn(letterClassName, {
                                "translate-y-5": index === activeIndex,
                                "translate-y-3":
                                    activeIndex !== undefined &&
                                    (index === activeIndex - 1 || index === activeIndex + 1),
                                "translate-y-1":
                                    activeIndex !== undefined &&
                                    (index === activeIndex - 2 || index === activeIndex + 2),
                            })}
                        >
                            <span className="absolute -translate-y-1/2 leading-none">{letter}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
