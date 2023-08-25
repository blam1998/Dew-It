import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';


export default function Page() {
  return (
    <main>
      <TopBar/>
      <main className = "flex flex-row gap-4">
        <LeftSideBar/>
        <div className = "text-black heading1-bold pt-28">All Task</div>
      </main>
    </main>
  )
}
