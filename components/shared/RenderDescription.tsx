"use client"
import Task from "@/lib/models/task.model";
import { updateTaskStatus, deleteTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";
import React, { useState } from 'react';
import EditForm from "../forms/EditForm";
import ReactDOM from 'react-dom';
import { fetchTaskById } from "@/lib/actions/task.actions";


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
    const [task, setTask] = useState(taskName)
    const [currDesc, setCurrDesc] = useState(description)
    const [currDueDate, setCurrDueDate] = useState(jsDate);


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

    const handleNameChange = (data : any) => {
        setTask(data.taskName);
        setCurrDesc(data.description);
        setCurrDueDate(new Date(data.dueDate));
    }

    const descriptionHandler = () => {
        const target = document.getElementById('rightsidebar');

        if (!target){return}
        ReactDOM.unmountComponentAtNode(target);
        ReactDOM.render(
        <div className = {`text-black heading1-bold renderdescription w-[100%] h-screen bg-white`} id = {`description-${clientId}`}>
            <EditForm id = {id} description = {currDesc} taskName = {task} isDone = {isDone} dueDate = {currDueDate} onEdit = {(data: any) => handleNameChange(data)}/>
        </div>
        , target);
    }



    return(
        <div className = {`text-black heading1-bold flex flex-row w-auto bg-white`} id = {clientId}>
            <div className = "text-black heading1-bold cursor-pointer h-fit" onClick = {() => descriptionHandler()}>{task}</div>
            <div className = "text-black heading1-bold ml-4 cursor-pointer h-fit" onClick = {() => completeHandler()}>{isDone? "Incomplete" : "Complete"}</div>
            <div className = "text-black heading1-bold ml-4 cursor-pointer h-fit" onClick = {() => deleteHandler()}>Delete</div>
        </div>
    )
}

export default RenderDescription;