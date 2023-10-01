"use client"
import {motion, useInView, useScroll, useTransform} from 'framer-motion'
import React, {useRef} from 'react'

interface inViewProps{
    children: React.JSX.Element,
    props: Object
}

export default function InView({children, props}:inViewProps) {
    const [opacity, x] = Object.values(props)
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true})

  return (
    <motion.div ref = {ref}
    className = {`flex flex-box w-full justify-center items-center basis-[90%] lg:basis-[45%]`}
    style = {{
        opacity: isInView? opacity : 0, x: isInView? 0 : x,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }}>
        {children}
    </motion.div>
  )
}
