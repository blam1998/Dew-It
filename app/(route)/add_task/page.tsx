"use client"
import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import  TaskForm  from '@/components/forms/TaskForm';
import {currentUser} from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions';
import MobileMenu from '@/components/shared/MobileMenu';
import { usePathname } from 'next/navigation';
import ReactGA from 'react-ga4'

ReactGA.initialize("G-Q52BV44ZNC");
ReactGA.send({hitType: "pageview", page: usePathname(), title: "Logged In"})

export default async function Page() {
  const user = await currentUser();

  if (!user){return null;}

  const userId = await fetchUser(user.id);

  return (
    <main>
      <TopBar/>
      <main className = "inner-container bg-dark-1">
        <div className = "leftsidebar hidden md:block">
          <LeftSideBar/>
        </div>
        <div className = "mobile-menu block md:hidden">
          <MobileMenu />
        </div>
        <TaskForm user = {userId._id.toString()}/>
      </main>
    </main>
  )
}
