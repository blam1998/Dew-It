"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


const Intro = () => {
    const router = useRouter();
    return(
        <main className = "bg-black h-screen flex flex-col gap-4 items-center">
            <section className = "flex flex-col gap-4 items-center">
                <h1 className = " text-heading1-bold text-white">K List</h1>
                <h2 className = "text-white text-heading2-bold">Get Organized Today.</h2>
                <Button onClick = {() => router.push('/home')}>Get Started</Button>
            </section>
        </main>
    )
}

export default Intro;