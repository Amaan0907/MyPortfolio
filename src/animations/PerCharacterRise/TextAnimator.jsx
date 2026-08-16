"use client"

import clsx from "clsx"
import { motion } from "motion/react"
 const TextAnimator = ({
    text = "",
    className = "",
}) => {
    const letters = text.split("")

    const pullupVariant = {
        initial: { y: 100, opacity: 0 },
        animate: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
                duration: 0.5, // Adjust duration for smoothness
            },
        }),
    }

    return (
        <div className={clsx("flex justify-center")}>
            {letters.map((letter, i) => (
                <motion.h1
                    key={i}
                    variants={pullupVariant}
                    initial="initial"
                    animate="animate"
                    custom={i}
                    className={clsx(
                        
                        className
                    )}
                >
                    {letter === " " ? <span>&nbsp;</span> : letter}
                </motion.h1>
            ))}
        </div>
    )
}

export default TextAnimator