"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import  Image  from 'next/image';


const Intro = () => {
    const router = useRouter();
    return(
        <main className = "bg-black h-screen flex flex-col gap-12 items-center overflow-y-auto overflow-x-hidden">
            <section className = "flex flex-col gap-4 items-center">
                <h1 className = " text-heading1-bold text-white mt-8">Dew it</h1>
                <h2 className = "text-white text-heading2-bold">Get Organized Today.</h2>
                <div className = "text-white text-body-semibold">Join us. We have cookies and memes.</div>
                <Button onClick = {() => router.push('/home')} className = "hover:bg-primary-500">Get Started</Button>
                <div className = "tilt-card max-w-[100vw] w-[100%] h-fit mt-8 mb-20 overflow-x-hidden overflow-y-hidden z-10 relative text-center" id = "tilt-card">
                    <Image src = '/assets/tilt-card2.png' alt = "Preview" width = {0} height = {0} sizes = "100vw"
                    style = {{width: '80%', height: 'auto'}} className = "tilt-card ml-auto mr-auto overflow-x-hidden overflow-y-hidden z-10 relative" id = "tilt-card-front"/>
                </div>
            </section>
        </main>
    )
}



if (typeof document !== 'undefined'){
    const card = document.getElementById('tilt-card');
    const cards = document.querySelectorAll('.tilt-card');

    


    const cardMouseMove = (event:any) => {
        const card = event.currentTarget;
        const cardWidth = card?.offsetWidth;
        const cardHeight = card?.offsetHeight;
        const centerX = (card? card.offsetLeft : 0) + (cardWidth? cardWidth/2 : 0)
        const centerY = (card? card?.offsetTop : 0) + (cardHeight? cardHeight/2 : 0)

        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;

        const rotateX = 5 *  mouseY/(cardHeight? (cardHeight/2) :  1)
        const rotateY = -1 * 5 *  mouseX/(cardWidth? (cardWidth/2) :  1)

        card? card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : null
        card? card.style.transition = `none 0s ease 0s` : null;
    }

    const cardMouseLeave = (event:any) => {
        const card = event.currentTarget;
        card? card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)` : null
        card? card.style.transition = `all 0.2s linear 0s` : null;
    }

    cards.forEach(card => {
        card?.addEventListener("mousemove", cardMouseMove);
        card?.addEventListener("mouseleave", cardMouseLeave);  
    });
}

export default Intro;