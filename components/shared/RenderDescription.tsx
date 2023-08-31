"use client"
import Task from "@/lib/models/task.model";
import { updateTaskStatus, deleteTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";

interface Props{
    taskName: string,
    dueDate: string,
    isDone: boolean,
    description: string,
    id: mongoose.Types.ObjectId,
    clientId: string,
}

const RenderDescription = ({taskName, dueDate, isDone, description, id, clientId} : Props) => {

    const router = useRouter();

    const jsDate = new Date(dueDate);
    const month = jsDate.getMonth() + 1;
    const day = jsDate.getDate();
    const year = jsDate.getFullYear();

    const cleanUp = async (target: string) => {
        document.getElementById(target)?.remove()
    }

    const completeHandler = async () => {
        await updateTaskStatus(id, isDone);
        await cleanUp(clientId);
    }

    const deleteHandler = async () => {
        await deleteTask(id);
        await cleanUp(clientId);
    }

    return(
        <div id = {clientId}>
            <div className = {`text-black heading1-bold mt-28 renderdescription w-60%`}>
                <div className = {`text-black heading1-bold flex flex-row mt-28`}>
                    <div className = "text-black heading1-bold cursor-pointer" onClick = {() => console.log("hi")}>{taskName}</div>
                    <div className = "text-black heading1-bold ml-4 cursor-pointer" onClick = {() => completeHandler()}>{isDone? "Incomplete" : "Complete"}</div>
                    <div className = "text-black heading1-bold ml-4 cursor-pointer" onClick = {() => deleteHandler()}>Delete</div>
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