import clsx from "clsx"
import { motion } from "motion/react"

 const MultiDirectionSlideText = ({
    textLeft = "",
    textRight = "",
    className = "",
    textClassName = "",
}) => {
    const MULTIDIRECTION_SLIDE_VARIANTS = {
        hidden: { opacity: 0, x: "-25vw" },
        visible: { opacity: 1, x: 0 },
        right: { opacity: 0, x: "25vw" },
    }

    return (
        <div className={clsx("overflow-hidden", className)}>
            {textLeft && (
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={MULTIDIRECTION_SLIDE_VARIANTS}
                    transition={{ duration: 1 }}
                    className={textClassName}
                >
                    {textLeft}
                </motion.h1>
            )}

            {textRight && (
                <motion.h1
                    initial="right"
                    animate="visible"
                    variants={MULTIDIRECTION_SLIDE_VARIANTS}
                    transition={{ duration: 1 }}
                    className={textClassName}
                >
                    {textRight}
                </motion.h1>
            )}
        </div>
    )
}

export default MultiDirectionSlideText
