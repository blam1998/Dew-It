"use client"
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {motion} from 'framer-motion'
import mobileFriendly from '@/public/assets/mobile-friendly.png'
import mobileFriendly2 from '@/public/assets/mobile-friendly2.png'
import easyComplete from '@/public//assets/easy-complete.gif'
import easyEdit from '@/public/assets/easy-edit.gif'
import thisWeek from '@/public/assets/this-week.png'
import design from '@/public/assets/design.png'
import upcoming from '@/public/assets/upcoming-changes.png'
import InView from '../animation/InView'


export default function InfoGallery() {
  const [mobile,setMobile] = useState(false);

  useEffect(() => {
    window.innerWidth > 1020? setMobile(false) : setMobile(true)
    console.log(window.innerWidth)
  },[])

  
  return (
    <div className = "flex flex-col justify-center items-start mt-8 pb-[20rem] w-[100%] text-gray-100">
      {/*Feature Showcase*/}

      <div className = "flex flex-row flex-wrap w-[100%] mt-28 p-8 gap-20 justify-center lg:justify-center items-center lg:items-start">
        <div className = "flex flex-col flex-wrap basis-[100%] lg:basis-[45%] gap-12 lg:gap-20 xl:gap-30 2xl:gap-40">
          <InView props = {{opacity: 1, x: mobile? 200 : -200}}>
            <div className = "flex flex-col justify-center items-center bg-dark-3 box-border p-4 xsm:p-8 rounded-xl">
              <Image src = {easyComplete} alt = "Easy Complete" quality = {90}/>
              <div className = "w-[100%] lg:w-[70%] mt-4">
                <div className = "text-[1.25rem] text-center font-semibold">
                  Simple and efficient.
                </div>
                <div className = "text-center break-words">
                  It has simple user interface that allows one click task complete or delete.
                </div>
              </div>
            </div>
          </InView>
          <InView props = {{opacity: 1, x: mobile? -200 : -200}}>
            <div className = "flex flex-col justify-center items-center bg-dark-3 box-border p-4 xsm:p-8 rounded-xl">
              <Image src = {thisWeek} alt = "This Week's Tasks" quality = {90}/>
              <div className = "w-[100%] lg:w-[70%] mt-4">
                <div className = "text-[1.25rem] text-center font-semibold">
                  Easy to organize.
                </div>
                <div className = "text-center break-words">
                  It has sort by dates feature, whether it's today or this week, or all tasks you have planned.
                </div>
              </div>
            </div>
          </InView>
        </div>
        <div className = "flex flex-col flex-wrap basis-[100%] lg:basis-[45%] lg:mt-[15rem]  gap-12 lg:gap-20 xl:gap-30 2xl:gap-40">
          <InView props = {{opacity: 1, x: mobile? 200 : 200}}>
            <div className = "flex flex-col justify-center items-center bg-dark-3 box-border p-4 xsm:p-8 rounded-xl">
              <Image src = {easyEdit} alt = "Easy Edit" quality = {90}/>
              <div className = "w-[100%] lg:w-[70%] mt-4">
                <div className = "text-[1.25rem] text-center font-semibold">
                  Easy to use and convenient.
                </div>
                <div className = "text-center break-words">
                  It has straight forward user interface with clear description. It also has a lengthy description
                  text editor that can store up to 1000 letters.
                </div>
              </div>
            </div>
          </InView>
          <InView props = {{opacity: 1, x: mobile? -200 : 200}}>
            <div className = "flex flex-col justify-center items-center bg-dark-3 box-border p-4 xsm:p-8 rounded-xl">
              <Image src = {upcoming} alt = "Upcoming Changes" quality = {90}/>
              <div className = "w-[100%] lg:w-[70%] mt-4">
                <div className = "text-[1.25rem] text-center font-semibold">
                  More features and quality of life additions in progress!
                </div>
                <div className = "text-center break-words">
                  I plan on adding more features and quality of life additions to make the app as useful as possible.
                </div>
              </div>
            </div>
          </InView>
        </div>
      </div>
    </div>
  )
}
