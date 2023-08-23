import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';


export default function Home() {
  return (
    <main>
      <TopBar/>
      <main className = "flex flex-row gap-4">
        <LeftSideBar/>
      </main>
    </main>
  )
}
