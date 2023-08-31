import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import {currentUser} from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions';
import { fetchAllTask } from '@/lib/actions/task.actions';
import RenderDescription from '@/components/shared/RenderDescription';


export default async function Page() {
  const user = await currentUser();

  if (!user){return}

  const userId = await fetchUser(user.id)

  const allTasks = await fetchAllTask(userId._id);

  return (
    <div className = "w-full">
      <TopBar/>
      <div className = "flex flex-row gap-4 w-full">
        <div className = "w-40% h-screen">
          <LeftSideBar/>
        </div>
        <div className = "flex flex-col text-black">
          {allTasks?.length !== 0? allTasks?.map((c,i) => {
            return(
              <div>
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
          }) : (<div className = "text-black heading1-bold mt-28 ml-60">No Tasks</div>)
        }
        </div>
      </div>
    </div>
  )
}
