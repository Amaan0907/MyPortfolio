"use client"

import { useEffect, useRef } from "react"
import clsx from "clsx"
import { motion } from "motion/react"
import { gsap } from "gsap"

// Per-letter entrance rise, then each letter magnetically pulls toward
// the cursor when it passes nearby (desktop / fine-pointer only).
const MagneticText = ({
    text = "",
    className = "",
    startDelay = 0,
    radius = 110,
    strength = 0.5,
    hoverEffect = true,
}) => {
    const containerRef = useRef(null)
    const letterRefs = useRef([])
    letterRefs.current = []

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

    useEffect(() => {
        const container = containerRef.current
        if (!container || !window.matchMedia("(pointer: fine)").matches) return

        const movers = letterRefs.current
            .filter(Boolean)
            .filter((el) => el.dataset.char !== " ")
            .map((el) => ({
                el,
                xTo: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }),
                yTo: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }),
                scaleTo: gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3.out" }),
            }))

        const reset = () => {
            movers.forEach(({ xTo, yTo, scaleTo }) => {
                xTo(0)
                yTo(0)
                scaleTo(1)
            })
        }

        const handleMove = (e) => {
            movers.forEach(({ el, xTo, yTo, scaleTo }) => {
                const rect = el.getBoundingClientRect()
                const cx = rect.left + rect.width / 2
                const cy = rect.top + rect.height / 2
                const dx = e.clientX - cx
                const dy = e.clientY - cy
                const dist = Math.hypot(dx, dy)

                if (dist < radius) {
                    const pull = (1 - dist / radius) * strength
                    xTo(-dx * pull)
                    yTo(-dy * pull)
                    scaleTo(1 + (1 - dist / radius) * 0.22)
                } else {
                    xTo(0)
                    yTo(0)
                    scaleTo(1)
                }
            })
        }

        window.addEventListener("mousemove", handleMove)
        window.addEventListener("mouseleave", reset)

        return () => {
            window.removeEventListener("mousemove", handleMove)
            window.removeEventListener("mouseleave", reset)
        }
    }, [radius, strength])

    return (
        <h1 ref={containerRef} className={clsx("flex flex-wrap", className)}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    ref={(el) => el && (letterRefs.current[i] = el)}
                    data-char={letter}
                    variants={pullupVariant}
                    initial="initial"
                    animate="animate"
                    custom={i}
                    whileHover={
                        hoverEffect && letter !== " "
                            ? { color: "var(--color-cream)", transition: { duration: 0.25, ease: "easeOut" } }
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

export default MagneticText
