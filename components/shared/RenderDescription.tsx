"use client"
import Task from "@/lib/models/task.model";
import { updateTaskStatus, deleteTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";
import React, { useState } from 'react';
import EditForm from "../forms/EditForm";
import ReactDOM from 'react-dom';
import { fetchTaskById } from "@/lib/actions/task.actions";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props{
    taskName: string,
    dueDate: string,
    isDone: boolean,
    description: string,
    id: mongoose.Types.ObjectId,
    clientId: string,
}

const RenderDescription = ({taskName, dueDate, isDone, description, id, clientId} : Props) => {
    const path = usePathname();
    const jsDate = new Date(dueDate);
    var pastDue = false;
    const [task, setTask] = useState(taskName)
    const [currDesc, setCurrDesc] = useState(description)
    const [currDueDate, setCurrDueDate] = useState(jsDate);
    const currDate = new Date();

    currDate.setHours(0,0,0,0);
    
    if (currDate > jsDate){
        pastDue = true;
    }




    const completeHandler = async () => {
        await updateTaskStatus(id, isDone, path);
        window.location.reload();
    }

    const deleteHandler = async () => {
        await deleteTask(id, path);
        window.location.reload();
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
            <EditForm id = {id} description = {currDesc} taskName = {task} isDone = {isDone} dueDate = {currDueDate} onEdit = {(data: any) => handleNameChange(data)} path = {path}/>
        </div>
        , target);
    }



    return(
        <div className = {`text-black heading1-bold flex flex-row w-auto bg-white ml-1 mt-1`} id = {clientId}>
            <div className = "bg-white p-2 w-[90%] cursor-pointer">
                <div className = {`${pastDue? "text-dark-red" : "text-black"} taskName`} onClick = {() => descriptionHandler()}>{task}</div>
            </div>
            <div className = "bg-white m-auto p-2 w-fit cursor-pointer" onClick = {() => completeHandler()}>
                {!isDone? (<Image src = "/assets/check-mark.svg" alt = "Complete" width = {28} height = {28}/>) 
                : (<Image src = "/assets/incomplete.svg" alt = "check mark" width = {28} height = {28}/>)}
            </div>
            <div className = "bg-white m-auto p-2 w-fit cursor-pointer" onClick = {() => deleteHandler()}>
                <Image src = "/assets/trash-can.svg" alt = "Delete" width = {28} height = {28}/>
            </div>
        </div>
    )
}

export default RenderDescription;