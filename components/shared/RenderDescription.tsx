"use client"
import Task from "@/lib/models/task.model";
import { updateTaskStatus } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";

interface Props{
    taskName: string,
    dueDate: any,
    isDone: any,
    description: any,
    id: any,
}

const RenderDescription = ({taskName, dueDate, isDone, description, id} : Props) => {

    const router = useRouter();
    /*
    const taskName = details.taskName;
    const dueDate = details.dueDate;
    const description = details.description;
    const isDone = details.isDone;
    const id = details._id;
    */

    const jsDate = new Date(dueDate);
    const month = jsDate.getMonth() + 1;
    const day = jsDate.getDate();
    const year = jsDate.getFullYear();
    console.log(id);

    const completeHandler = async () => {
        if (isDone) return
        
        await updateTaskStatus(id)

        router.push(`/all_task`);


    }

    return(
        <div>
            <div className = {`text-black heading1-bold mt-28 renderdescription w-60%`}>
                <div className = {`text-black heading1-bold flex flex-row mt-28`}>
                    <div className = "text-black heading1-bold cursor-pointer" onClick = {() => console.log("hi")}>{taskName}</div>
                    <div className = "text-black heading1-bold ml-4 cursor-pointer" onClick = {() => completeHandler()}>Complete 1</div>
                    <div className = "text-black heading1-bold ml-4 cursor-pointer">Delete 1</div>
                </div>
                <div className = "flex flex-col gap-4">
                    <div className = "text-black heading1-bold mt-4">{`Task Name: ${taskName}`}</div>
                    <div className = "text-black heading1-bold mt-4">{`Due Date: ${month + "-" + day + '-' + year}`}</div>
                    <div className = "text-black heading1-bold mt-4">Description</div>
                    <div className = "text-black heading1-bold mt-4">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default RenderDescription;