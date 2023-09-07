import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import {currentUser} from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions';
import {fetchDateTask } from '@/lib/actions/task.actions';
import RenderDescription from '@/components/shared/RenderDescription';



export default async function Page() {
  const user = await currentUser();

  if (!user){return}

  const userId = await fetchUser(user.id)

  const date = new Date();

  const allTasks = await fetchDateTask(userId._id, '1', date.toString());

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
              <div className = "w-[100%]" id = {"task-"+i.toString()}>
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
          }) : (<div className = "noTask">No Tasks Completed</div>)
        }
        </div>
        <div className = "w-[33vw] bg-white" id = 'rightsidebar'>
        </div>
      </div>
    </div>
  )
}
