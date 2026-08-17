"use client"

import clsx from "clsx"
import { motion } from "motion/react"

const TextAnimator = ({
    text = "",
    className = "",
    hoverEffect = true,
    startDelay = 0,
}) => {
    const words = text.split(" ")

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

    let globalIndex = 0

    const renderLetter = (letter, key) => {
        const i = globalIndex++
        return (
            <motion.span
                key={key}
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
                {letter}
            </motion.span>
        )
    }

    return (
        <h1 className={clsx("flex flex-wrap", className)}>
            {words.map((word, wi) => (
                <span key={wi} className="inline-flex whitespace-nowrap">
                    {word.split("").map((letter, li) => renderLetter(letter, `${wi}-${li}`))}
                    {wi < words.length - 1 && renderLetter(" ", `space-${wi}`)}
                </span>
            ))}
        </h1>
    )
}

export default TextAnimator
