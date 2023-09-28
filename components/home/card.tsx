import React from 'react'

interface CardProps{
    children: React.ReactNode
}

export default function Card({children} : CardProps) {
  return (
    <section className = "flex flex-col mb:flex-row max-w-[60rem] w-[min(90%, 60rem)] justify-center items-center bg-slate-500 p-8 border-box mb:items-start gap-8 rounded-md">
        {children}
    </section>
  )
}
