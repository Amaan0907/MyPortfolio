"use client"

import clsx from "clsx"
import { motion } from "motion/react"

const TextAnimator = ({
    text = "",
    className = "",
    hoverEffect = true,
    startDelay = 0,
}) => {
    const letters = text.split("")

    const pullupVariant = {
        initial: { y: 120, opacity: 0, rotate: 6 },
        animate: (i) => ({
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                delay: startDelay + i * 0.035,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    }

    return (
        <h1 className={clsx("flex flex-wrap", className)}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    variants={pullupVariant}
                    initial="initial"
                    animate="animate"
                    custom={i}
                    whileHover={
                        hoverEffect
                            ? { y: -14, color: "var(--color-cream)", transition: { duration: 0.25, ease: "easeOut" } }
                            : undefined
                    }
                    className="inline-block will-change-transform"
                >
                    {letter === " " ? <span>&nbsp;</span> : letter}
                </motion.span>
            ))}
        </h1>
    )
}

export default TextAnimator
