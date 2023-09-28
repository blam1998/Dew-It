"use client"
import { useRouter } from 'next/navigation';
import  Image  from 'next/image';
import React, { useRef } from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import ScrollFade from '../animation/scroll-fade';
import BrandInfo from './BrandInfo';
import RotateImage from '../animation/RotateImage';

import tiltCard from '@/public/assets/tilt-card2.png'
import InfoGallery from './InfoGallery';


interface IntroProps{
    path: string
}
export default function Intro({path}:IntroProps){

    return(
        <div className = "bg-black w-[100%] overflow-x-hidden flex flex-col items-center justify-start text-white min-h-[max(h-fit,h-screen)] z-10 gap-4 relative">
            <div className = "h-[20%] w-[50%] bg-lime-800 absolute -top-[10%] left-3/4 blur-[10rem] rounded-full -z-20"></div>
            <div className = "h-[30%] w-[50%] bg-lime-800 absolute top-[15%] -left-[30%] blur-[10rem] rounded-full -z-20"></div>
            <BrandInfo path = {path}/>
            <RotateImage>
                <Image src = {tiltCard} alt = "tilt-card" className = "w-[90%] max-w-[min(90%, 90rem)] py-[5rem] mb:py-[5rem]"/>
                <InfoGallery/>
            </RotateImage>
        </div>
    )
}


