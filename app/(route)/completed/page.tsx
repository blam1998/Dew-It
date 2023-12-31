import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import {currentUser} from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions';
import { fetchAllTask, fetchAllCompletedTask } from '@/lib/actions/task.actions';
import RenderDescription from '@/components/shared/RenderDescription';
import MobileMenu from '@/components/shared/MobileMenu';
import RenderContainer from '@/components/shared/RenderContainer';
import ReactGA from 'react-ga4';

export default async function Page() {
  ReactGA.initialize("G-Q52BV44ZNC");
  ReactGA.send({hitType: "pageview", page: "/completed", title: "Logged In"})
  const user = await currentUser();

  if (!user){return}

  const userId = await fetchUser(user.id)

  var allTasks = await fetchAllCompletedTask(userId._id);
  allTasks?.sort((a:any,b:any) => {
    return a.dueDate - b.dueDate
  })

  return (
    <div className = "w-[100%] bg-gray h-screen">
      <TopBar/>
      <div className = "inner-container">
        <div className = "leftsidebar hidden md:block">
          <LeftSideBar />
        </div>
        <div className = "mobile-menu block md:hidden">
          <MobileMenu />
        </div>
        <div className = "renderdescription">
        {allTasks?.length !== 0? allTasks?.map((c:any,i:any) => {
            return(
              <div className = "w-[100%]" id = {"task-" + i.toString()} key = {c._id.toString()}>
                <RenderDescription 
                  taskName = {c.taskName}
                  description = {c.description}
                  id = {c._id.toString()}
                  dueDate = {c.dueDate}
                  isDone = {c.isDone}
                  clientId = {"task-"+c._id.toString()}
                  userId = {userId._id.toString()}
                />
              </div>
            )
          }) : (<div className = "noTask">No Tasks Completed</div>)
        }
        </div>
        <div className = "hidden sm:block sm:w-[50vw] md:w-[40vw] bg-dark-4 h-screen" id = 'rightsidebar'>
        </div>
        <div className = "block sm:hidden absolute" id = 'rightsidebar-mobile'>
        </div>
      </div>
    </div>
  )
}

