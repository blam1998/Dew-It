import React from 'react'
import Image from 'next/image'
import mobileFriendly from '@/public/assets/mobile-friendly.png'
import mobileFriendly2 from '@/public/assets/mobile-friendly2.png'
import easyComplete from '@/public//assets/easy_complete.gif'
import easyEdit from '@/public/assets/easy_edit.gif'
import thisWeek from '@/public/assets/this-week.png'
import design from '@/public/assets/design.png'
import upcoming from '@/public/assets/upcoming-changes.png'


export default function InfoGallery() {
  return (
    <div className = "flex flex-col justify-center items-center mt-8 pb-[20rem] w-[100%] text-gray-100">
      <div className = "flex flex-col justify-center items-center w-[90%] mb:w-[50%] gap-12">
        <div className = "text-left mb:text-center">
          <h2 className = "text-[1.75rem]">Designed to trigger your college PTSD...</h2>
          <h2 className = "text-[1.75rem]">And maybe create new ones.</h2>
        </div>
        <Image src = {design} alt = "Design" quality = {90} />
      </div>

      {/*Feature Showcase*/}

      <div className = "flex flex-row flex-wrap w-[100%] mt-20 p-8 gap-20 justify-center lg:justify-between items-center">
        <div className = "flex flex-col basis-[90%] lg:basis-[45%] justify-center items-center">
          <Image src = {easyComplete} alt = "Easy Complete" quality = {90}/>
          <div className = "w-[100%] lg:w-[70%]">
            <div className = "text-[1.25rem] text-center font-semibold">
              Simple and efficient.
            </div>
            <div className = "text-center break-words">
              It has simple user interface that allows one click task complete or delete.
            </div>
          </div>
        </div>
        <div className = "flex flex-col basis-[90%] lg:basis-[45%] justify-center items-center">
          <Image src = {easyEdit} alt = "Easy Edit" quality = {90}/>
          <div className = "w-[100%] lg:w-[70%]">
            <div className = "text-[1.25rem] text-center font-semibold">
              Easy to use and convenient.
            </div>
            <div className = "text-center break-words">
              It has straight forward user interface with clear description. It also has a lengthy description
              text editor that can store up to 1000 letters.
            </div>
          </div>
        </div>
        <div className = "flex flex-col basis-[90%] lg:basis-[45%] justify-center items-center">
          <Image src = {thisWeek} alt = "This Week's Tasks" quality = {90}/>
          <div className = "w-[100%] lg:w-[70%]">
            <div className = "text-[1.25rem] text-center font-semibold">
              Easy to organize.
            </div>
            <div className = "text-center break-words">
              It has sort by dates feature, whether it's today or this week, or all tasks you have planned.
            </div>
          </div>
        </div>
        <div className = "flex flex-col basis-[90%] lg:basis-[45%] justify-center items-center">
          <Image src = {upcoming} alt = "Upcoming Changes" quality = {90}/>
          <div className = "w-[100%] lg:w-[70%]">
            <div className = "text-[1.25rem] text-center font-semibold">
              More features and quality of life additions in progress!
            </div>
            <div className = "text-center break-words">
              I plan on adding more features and quality of life additions to make the app as useful as possible.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
