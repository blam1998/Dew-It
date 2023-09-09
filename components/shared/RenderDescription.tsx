"use client"
import { updateTaskStatus, deleteTask, fetchAllTask } from "@/lib/actions/task.actions";
import mongoose from "mongoose";
import React, { useState } from 'react';
import EditForm from "../forms/EditForm";
import ReactDOM, { hydrate } from 'react-dom';
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createRoot, hydrateRoot } from 'react-dom/client';

interface Props{
    taskName: string,
    dueDate: string,
    isDone: boolean,
    description: string,
    id: mongoose.Types.ObjectId,
    clientId: string,
    userId: mongoose.Types.ObjectId
}

const RenderDescription = ({taskName, dueDate, isDone, description, id, clientId, userId} : Props) => {
    const router = useRouter();
    const path = usePathname();
    const jsDate = new Date(dueDate);
    var pastDue = false;
    const [task, setTask] = useState(taskName)
    const [currDesc, setCurrDesc] = useState(description)
    const [currDueDate, setCurrDueDate] = useState(jsDate);
    const currDate = new Date();

    const dateString = (jsDate.getMonth() + 1) + "-" + jsDate.getDate() + "-" + jsDate.getFullYear();

    currDate.setHours(0,0,0,0);
    
    if (currDate > jsDate){
        pastDue = true;
    }

    const completeHandler = async () => {
        await updateTaskStatus(id, isDone, path);
    }

    const deleteHandler = async () => {
        await deleteTask(id.toString(), path, userId.toString());
    }

    const handleNameChange = (data : any) => {
        setTask(data.taskName);
        setCurrDesc(data.description);
        setCurrDueDate(new Date(data.dueDate));
    }

    const descriptionHandler = () => {
        const container = document.getElementById('rightsidebar');
        const root = container? createRoot(container) : null  

        root? root.render(
            <div className = {`text-black heading1-bold renderdescription w-[100%] h-screen bg-white`} id = {`description-${clientId}`}>
                <EditForm id = {id} description = {currDesc} taskName = {task} isDone = {isDone} dueDate = {currDueDate} onEdit = {(data: any) => handleNameChange(data)} path = {path}/>
            </div>) : null
    }



    return(
        <div className = {`text-black flex flex-row w-auto bg-white flex-nowrap`} key = {clientId}>
            <div className = "bg-white p-2 w-[80%] cursor-pointer overflow-hidden text-ellipsis block whitespace-nowrap" title = {task}>
                <div className = {`${path!== "/completed" && pastDue? "text-dark-red" : "text-black"} ${path === "/completed"? "text-dark-green" : ""} taskName`} onClick = {() => descriptionHandler()}>{task}</div>
            </div>
            <div className = "bg-white p-2 w-[15%]">
                <div className = {`${path!== "/completed" && pastDue? "text-dark-red" : "text-black"} ${path === "/completed"? "text-dark-green" : ""} taskDate`} onClick = {() => descriptionHandler()}>{dateString}</div>
            </div>
            <div className = "bg-white m-auto p-2 w-fit cursor-pointer" onClick = {() => completeHandler()}>
                {!isDone? (<Image src = "/assets/check-mark.svg" title = "Mark as complete" alt = "Complete" width = {28} height = {28}/>) 
                : (<Image src = "/assets/incomplete.svg" title = "Mark as incomplete" alt = "Incomplete" width = {28} height = {28}/>)}
            </div>
            <div className = "bg-white m-auto p-2 w-fit cursor-pointer" onClick = {() => deleteHandler()}>
                <Image src = "/assets/trash-can.svg" title = "Delete" alt = "Delete" width = {28} height = {28}/>
            </div>
        </div>
    )
}

export default RenderDescription;