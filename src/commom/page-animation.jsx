import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimationWrapper = ({
    children,
    initial = { y: 20, opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: 20, opacity: 0 },
    transition = {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        type: 'spring',
    },
    keyValue,
    className,
}) => {
    return (
        <AnimatePresence>
            <motion.div initial={initial} animate={animate} exit={exit} transition={transition} key={keyValue} className={className}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimationWrapper;