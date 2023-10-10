"use client"
import React, {useRef} from 'react'
import rotateImg from '@/public/assets/rotate-graphics.png'
import {motion, useScroll, useTransform} from 'framer-motion';
import Image from 'next/image';

interface RotateImageProps{
    children: React.ReactNode;
}

export default function RotateImage({children}:RotateImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target:ref,
        offset: ["0 .5", "1.3 1"]
    })

    var translateY = useTransform(scrollYProgress, [0,1], [-400, 400])
    var translateX = useTransform(scrollYProgress, [0,1], [-400, 400])

  return (
    <motion.div
        className = "w-full flex flex-col items-center justify-center relative overflow-hidden"
        ref = {ref}>
            <motion.div className = {`rotate-container absolute top-0 left-0 w-full h-full -z-10 overflow-x-hidden`}
            style = {{
                translateY: translateY,
                translateX: translateX
            }}
            transition = {{
                duration: 0.3,
            }}>
                <div className = "relative w-full h-full overflow-hidden blur-lg">
                    <Image src = {rotateImg} alt = "Rotate Image" className = "rotate-image hidden lg:block translate-x-[0%] -translate-y-[15%] -z-10"
                    id = "rotate-image-1"/>
                    <Image src = {rotateImg} alt = "Rotate Image" className = "rotate-image hidden lg:block -translate-x-[5%] translate-y-[50%] -z-10"
                    id = "rotate-image-2" />
                    <Image src = {rotateImg} alt = "Rotate Image" className = "rotate-image hidden lg:block -translate-x-[10%] translate-y-[75%] -z-10"
                    id = "rotate-image-3" />
                </div>
            </motion.div>
        {children}
    </motion.div>
  )
}