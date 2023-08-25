import Image from 'next/image'
import Intro from '@/components/shared/Intro';

export default function Page() {
  return (
    <main className = "bg-black h-screen flex flex-col gap-4 items-center">
        <Intro/>
    </main>
  )
}
