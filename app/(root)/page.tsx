import Image from 'next/image'
import Intro from '@/components/shared/Intro';
import { currentUser } from '@clerk/nextjs';

export default async function Page() {
  const user = await currentUser();

  var path = user? '/home' : '/sign-in'
  
  return (
    <main className = "bg-black h-screen flex flex-col gap-4 items-center">
        <Intro path = {path}/>
    </main>
  )
}
