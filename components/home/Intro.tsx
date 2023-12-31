"use client"
import { useRouter } from 'next/navigation';
import  Image  from 'next/image';
import React, { useRef } from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import ScrollFade from '../animation/scroll-fade';
import BrandInfo from './BrandInfo';
import RotateImage from '../animation/RotateImage';

import tiltCard from '@/public/assets/tilt-card.png'
import InfoGallery from './InfoGallery';
import DewItInfo from './DewItInfo';


interface IntroProps{
    path: string
}
export default function Intro({path}:IntroProps){

    return(
        <div className = "bg-black w-[100%] overflow-x-hidden flex flex-col items-center justify-start text-white min-h-[max(h-fit,h-screen)] z-10 gap-4 relative">
            <div className = "colorGlow h-[20%] w-[50%] bg-lime-900 absolute -top-[10%] left-3/4 blur-[10rem] rounded-full -z-20"></div>
            <div className = "colorGlow h-[30%] w-[50%] bg-lime-900 absolute top-[15%] -left-[30%] blur-[10rem] rounded-full -z-20"></div>
            <div className = "h-[100%] w-[100%] absolute top-0 bg-dark-3/20 blur-xl -z-15"></div>
            <RotateImage>
                <motion.div 
                initial = {{opacity: 0, y: -100}}
                animate = {{opacity: 1, y: 0}}
                transition = {{delay: 0.5}}
                className = "flex flex-col items-center justify-center">
                    <BrandInfo path = {path}/>
                </motion.div>
                <motion.div className = "flex flex-col items-center justify-center"
                initial = {{opacity: 0, y: 100}}
                animate = {{opacity: 1, y: 0}}
                transition = {{delay: 0.5}}>
                    <Image src = {tiltCard} alt = "tilt-card" 
                    className = "hidden mt-24 xsm:block w-[100%] xsm:w-[80%] max-w-[min(80%, 90rem)] py-[5rem] mb:py-[5rem] box-border p-2 rounded-2xl bg-dark-3"/>
                </motion.div>
                <DewItInfo/>
                <div className = "mt-[10rem]"></div>
                <InfoGallery/>
            </RotateImage>
        </div>
    )
}


