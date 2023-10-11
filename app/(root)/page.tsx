import Image from 'next/image'
import Intro from '@/components/home/Intro';
import { currentUser } from '@clerk/nextjs';
import { testimonials } from '@/lib/testimonials';
import ReactGA from 'react-ga4'




export default async function Page() {
  ReactGA.initialize("G-Q52BV44ZNC");
  ReactGA.send({hitType: "pageview", page: "/", title: "Home Page"})
  const user = await currentUser();
  
  var path = user? '/home' : '/sign-in'
  

  return (
    <main className = "h-fit flex flex-col gap-4 items-center relative w-[100%] overflow-x-hidden">
      <Intro path = {path}/>
    </main>
  )
}
