import Image from 'next/image'
import Intro from '@/components/home/Intro';
import { currentUser } from '@clerk/nextjs';
import { testimonials } from '@/lib/testimonials';

export default async function Page() {
  const user = await currentUser();
  
  var path = user? '/home' : '/sign-in'
  

  return (
    <main className = "h-fit flex flex-col gap-4 items-center relative w-[100%] overflow-x-hidden">
      <Intro path = {path}/>
    </main>
  )
}
