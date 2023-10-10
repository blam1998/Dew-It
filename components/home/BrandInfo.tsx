"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

interface BrandInfoProps{
    path:string
}

export default function BrandInfo({path} : BrandInfoProps) {
    const router = useRouter();

  return (
    <>
        <div className = "text-heading2-bold mb:text-heading1-bold mt-20 lg:mt-20">Dew It</div>
        <div className = "text-heading3-semibold mb:text-heading1-semibold">Get Organized Today!</div>
        <div className = "flex flex-row gap-4 items-center justify-center box-border py-8">
            <Button 
            onClick = {() => router.push(path)} 
            className = "hover:bg-emerald-500 hover:text-black hover:scale-[1.1] hover:shadow-lg hover:shadow-emerald-300/80 transition-all">Log In</Button>
            <Button 
            onClick = {() => router.push('/sign-up')}
            className = "hover:bg-emerald-500 hover:text-black hover:scale-[1.1] hover:shadow-lg hover:shadow-emerald-300/80 transition-all">Sign Up</Button>
        </div>
    </>
  )
}
