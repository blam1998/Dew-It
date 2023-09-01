"use client"
import Task from "@/lib/models/task.model";
import { updateTaskStatus, deleteTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";
import React from 'react';
import EditForm from "../forms/EditForm";
import ReactDOM from 'react-dom';


interface Props{
    taskName: string,
    dueDate: string,
    isDone: boolean,
    description: string,
    id: mongoose.Types.ObjectId,
    clientId: string,
}

const RenderDescription = ({taskName, dueDate, isDone, description, id, clientId} : Props) => {

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

    const descriptionHandler = () => {
        const target = document.getElementById('rightsidebar');
        /*
        if (target && target.childNodes.length > 0){
            target.firstChild?.remove();
        }
        */

        if (!target){return}
        ReactDOM.unmountComponentAtNode(target);
        ReactDOM.render(
        <div className = {`text-black heading1-bold renderdescription w-[30%] h-screen`} id = {`description-${clientId}`}>
            <EditForm id = {id} description = {description} taskName = {taskName} isDone = {isDone} dueDate = {jsDate}/>
        </div>
        , target);
    }
    return(
        <div id = {clientId} className = "w-[60%] flex flex-row bg-gray">
            <div className = {`text-black heading1-bold renderdescription w-full`}>
                <div className = {`text-black heading1-bold flex flex-row`}>
                    <div className = "text-black heading1-bold cursor-pointer h-fit" onClick = {() => descriptionHandler()}>{taskName}</div>
                    <div className = "text-black heading1-bold ml-4 cursor-pointer h-fit" onClick = {() => completeHandler()}>{isDone? "Incomplete" : "Complete"}</div>
                    <div className = "text-black heading1-bold ml-4 cursor-pointer h-fit" onClick = {() => deleteHandler()}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default RenderDescription;