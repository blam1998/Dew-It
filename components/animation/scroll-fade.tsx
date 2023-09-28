"use client"
import {motion, useScroll, useTransform} from 'framer-motion';
import React, {useRef} from 'react'

interface  ScrollFadeProps {
    children: React.ReactNode
}

export default function ScrollFade({children}: ScrollFadeProps) {
    const ref = useRef<HTMLDivElement>(null);
    let {scrollYProgress} = useScroll({
        target: ref,
        offset: ["0 1", "1.3 1"]
    })

    let scrollOpacity = useTransform(scrollYProgress, [0,1], [0.5,1]);
    let scrollScale = useTransform(scrollYProgress, [0,1], [0.5,1]);

  return (
    <motion.div className = "w-[100%] h-fit"
    ref = {ref}
    style = {{
        opacity: scrollOpacity,
        scale: scrollScale
    }}>
        {children}
    </motion.div>
  )
}
