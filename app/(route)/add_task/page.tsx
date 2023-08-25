import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import { TaskForm } from '@/components/forms/task';

export default function Page() {

  return (
    <main>
      <TopBar/>
      <main className = "flex flex-row bg-dark-blue w-full">
        <LeftSideBar/>
        <TaskForm/>
      </main>
    </main>
  )
}
