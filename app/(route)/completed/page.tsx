import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import {currentUser} from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions';
import { fetchAllTask, fetchAllCompletedTask } from '@/lib/actions/task.actions';
import RenderDescription from '@/components/shared/RenderDescription';


export default async function Page() {
  const user = await currentUser();

  if (!user){return}

  const userId = await fetchUser(user.id)

  const allTasks = await fetchAllCompletedTask(userId._id);

  return (
    <div className = "w-[100%] bg-gray h-screen">
      <TopBar/>
      <div className = "inner-container">
        <div className = "leftsidebar">
          <LeftSideBar/>
        </div>
        <div className = "renderdescription">
          {allTasks?.length !== 0? allTasks?.map((c,i) => {
            return(
              <div className = "w-[100%]">
                <RenderDescription 
                  taskName = {c.taskName}
                  description = {c.description}
                  id = {c._id}
                  dueDate = {c.dueDate}
                  isDone = {c.isDone}
                  clientId = {"task-"+i.toString()}
                />
              </div>
            )
          }) : (<div className = "text-black heading1-bold">No Tasks</div>)
        }
        </div>
        <div className = "w-[33vw] bg-white" id = 'rightsidebar'>
        </div>
      </div>
    </div>
  )
}