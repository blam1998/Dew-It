import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import  TaskForm  from '@/components/forms/TaskForm';
import {currentUser} from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions';

export default async function Page() {
  const user = await currentUser();

  if (!user){return null;}

  const userId = await fetchUser(user.id);

  return (
    <main>
      <TopBar/>
      <main className = "inner-container bg-dark-blue">
        <div className = "leftsidebar">
          <LeftSideBar/>
        </div>
        <TaskForm user = {userId._id}/>
      </main>
    </main>
  )
}
