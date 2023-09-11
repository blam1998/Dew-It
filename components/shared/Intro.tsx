"use client"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import  Image  from 'next/image';
import {testimonials} from '../../lib/testimonials';
import { useState } from 'react';



const Intro = () => {
    const router = useRouter();
    const [index, setIndex] = useState(0);

    const randomizeTestimony = () => {
        const random = Math.floor(Math.random() * testimonials.length);
        setIndex(random);
    }

    setTimeout(randomizeTestimony,5000);
    return(
        <main className = "bg-black h-fit flex flex-col gap-12 items-center overflow-y-auto overflow-x-hidden w-[100%]">
            <section className = "flex flex-col gap-4 items-center">
                <h1 className = " text-heading1-bold text-white mt-8 z-20">Dew it</h1>
                <h2 className = "text-white text-heading2-bold z-20">Get Organized Today.</h2>
                <div className = "text-white text-body-semibold whitepace-pre text-center z-20">
                    Join us. We have cookies and memes.<br/>
                    Made with anger, and only 13 monster energy drink.
                </div>
                <Button onClick = {() => router.push('/home')} className = "hover:bg-primary-500 z-20">Get Started</Button>
                <div className = "tilt-card max-w-[100vw] w-[100%] h-fit mt-8 mb-20 overflow-x-hidden overflow-y-hidden z-10 relative text-center" id = "tilt-card">
                    <Image src = '/assets/tilt-card2.png' alt = "Preview" width = {0} height = {0} sizes = "100vw"
                    style = {{width: '80%', height: 'auto'}} className = "tilt-card ml-auto mr-auto overflow-x-hidden overflow-y-hidden z-10 relative" id = "tilt-card-front"/>
                </div>
                <div className = "background-mid text-white h-fit flex flex-col items-center w-[100%] h-fit relative pt-20 justify-center">
                    <div className = "flex flex-col-reverse items-center-reverse mb:flex-row mb:justify-end mb:items-center gap-12 w-[90%] mb:ml-auto mb:mr-auto">
                            <div className = "text-center mb:text-left text-wrap text-heading3-semibold w-[90%] mb:w-[30%] pt-12 border-box">
                                Designed solely to trigger your college/highschool traumas of late assignments.

                                <span className = "text-wrap text-body-semibold">
                                    <br/><br/><br/>Remember when you went for that sweet nap at 8 PM? telling yourself that it's only 30 minutes nap;
                                    That you will wake up and finish the last few easy problems within an hour; Only to wake up at 2 AM and a "Past Due" on your assignment?
                                    <br/><br/>Well... It's back.
                                </span>
                            </div>
                            <div className = "ml-auto mr-auto mb:ml-0 mb:mr-0 max-w-[90%] mb:max-w-[60%]">
                                <Image src = '/assets/design.png' alt = "design" title = "c:" width = {400} height = {200}/>
                            </div>
                    </div>
                    <div className = "flex flex-col justify-center items-center mb:flex-row mb:justify-between mb:items-center gap-8 border-box pt-20 w-[90%]">
                        <div className = "flex flex-col w-[100%] mb:w-[45%]">
                            <img src = '/assets/easy_complete.gif' alt = "Easy Complete" className = "w-[100%] h-auto"/>
                            <div className = "text-center text-heading3-semibold pt-4">We got easy task check-list.</div>
                        </div>
                        <div className = "flex flex-col w-[100%] mb:w-[45%]">
                            <img src = '/assets/easy_edit.gif' alt = "Easy Edit" className = "w-[100%] h-auto"/>
                            <div className = "text-center text-heading3-semibold pt-4">We got easy task edit functionality.</div>
                        </div>
                    </div>
                    <div className = "hidden mb:flex flex-row gap-20 border-box pt-20 w-[90%] justify-start">
                        <div>
                            <img src = '/assets/mobile-friendly.png' alt = "Mobile Friendly" title = "Mobile Friendly" className = "w-[100%] h-auto"/>
                        </div>
                        <div className = "text-heading1-semibold whitespace-pre">
                            It's mobile friendly. <br></br>
                            <span className = "text-heading2-semibold">I promise.</span> <br></br>
                            <span className = "text-body-semibold">Maybe.</span></div>
                    </div>
                </div>
                <div className = "text-white border-box pt-[20rem] pb-20 flex flex-col items-center justify-center w-[90%] mb:w-[50%]"> 
                    <div className = "border-box pt-8 flex flex-row gap-4 w-[100%] overflow-x-hidden overflow-y-hidden items-center justify-center">
                        {
                        testimonials? testimonials.map((c:any,i:any) => {
                            return(
                                <div className = {`overflow-y-hidden testimonial-flex max-w-[48px] min-w-[48px] ${index === i? 'testimonial-border' : ''}`} id = {`testimony-${i}`}>
                                    <Image src = {c.image} alt = "user" width = {48} height = {48}  className = "block ml-auto mr-auto"/>
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className = "text-white pt-10 pb-10 text-body-semibold text-wrap w-[100%] text-center">{testimonials[index].description}
                    <br/>
                        <span>
                            {`--${testimonials[index].name}`}
                        </span>
                    </div>
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