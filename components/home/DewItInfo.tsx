import React, {useRef} from 'react'
import design from '@/public/assets/design.png'
import Image from 'next/image'
import { useInView, motion } from 'framer-motion'

export default function DewItInfo() {
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const inView1 = useInView(ref1, {once: true})
    const inView2 = useInView(ref2, {once: true})
  return (
    <motion.div className = "w-[100%] lg:w-[80%] flex flex-row justify-center xsm:items-start mt-20 xsm:mt-40 gap-12 bg-dark-3 rounded-2xl box-border p-8"
    style = {{
        opacity: inView1? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }}
    >
        <motion.div className = {`flex flex-col justify-between items-start text-white text-[1.25rem] basis-[100%] 
        lg:basis-[45%] relative bg-dark-3 xsm:bg-transparent box-border p-4`}
        ref = {ref1}
        style = {{
            opacity: inView1? 1 : 0, x: inView1? 0 : -200,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}>
            <div className = "text-[2.25rem] font-semibold">What is Dew It?</div>
            <div className = "whitespace-pre-line mt-12">Dew It is a dynamic and efficient task management application designed to streamline your daily productivity.
             With its user-friendly interface, you can quickly add, complete, or delete tasks, making it effortless to stay on top of your to-do list.
              The app also allows you to provide detailed descriptions for tasks, ensuring you have all the necessary information at your fingertips.
               Additionally, Dew It includes a due date tracker, helping you prioritize and manage your tasks effectively, so you never miss an important deadline again.
             </div>
        </motion.div>
        <motion.div className = "hidden xsm:flex basis-[90%] lg:basis-[45%]"
        style = {{
            opacity: inView1? 1 : 0, x: inView1? 0 : 200,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}>
            <Image src = {design} alt = "Design"/>
        </motion.div>
    </motion.div>
  )
}
