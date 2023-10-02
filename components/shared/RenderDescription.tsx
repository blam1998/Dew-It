"use client"
import { updateTaskStatus, deleteTask, fetchAllTask } from "@/lib/actions/task.actions";
import mongoose from "mongoose";
import React, { DOMElement, useState, useEffect } from 'react';
import EditForm from "../forms/EditForm";
import ReactDOM, { hydrate } from 'react-dom';
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createRoot, hydrateRoot } from 'react-dom/client';
import Popup from "./Popup";
import { revalidatePath } from "next/cache";
import { assert } from "console";

interface Props{
    taskName: string,
    dueDate: string,
    isDone: boolean,
    description: string,
    id: mongoose.Types.ObjectId,
    clientId: string,
    userId: mongoose.Types.ObjectId | string
}

const RenderDescription = ({taskName, dueDate, isDone, description, id, clientId, userId} : Props) => {
    const path = usePathname();
    const jsDate = new Date(dueDate);
    var pastDue = false;
    const [task, setTask] = useState(taskName) //client side update for edit task
    const [currDesc, setCurrDesc] = useState(description) //client side update for edit task
    const [currDueDate, setCurrDueDate] = useState(jsDate); //client side update for edit task
    const [srightBar, setRightBar] = useState();
    const currDate = new Date();

    const dateString = (jsDate.getMonth() + 1) + "-" + jsDate.getDate() + "-" + jsDate.getFullYear();

    currDate.setHours(0,0,0,0);
    
    if (currDate > jsDate){
        pastDue = true;
    }

    //On complete, update database and remove task from rightside bar if it's the one active.
    const completeHandler = async (e:any) => {
        const rightBar = document.getElementById('rightsidebar');
        console.log(rightBar?.firstChild);
        const root = createRoot(rightBar as HTMLElement);
        root.unmount();
        rightBar?.firstChild?.remove();
        await updateTaskStatus(id, isDone, path);
    }

    const deleteHandler = async (e:any) => {
        await deleteTask(id.toString(), path, userId.toString());
    }

    const handleNameChange = (data : any) => {
        setTask(data.taskName);
        setCurrDesc(data.description);
        setCurrDueDate(new Date(data.dueDate));
    }

    const descriptionHandler = () => {
        var root2:any = null
        var root: any = null


        const container = document.getElementById('rightsidebar');
        root = container? createRoot(container) : null

        
        root? root.render(
            <div className = {`text-black heading1-bold renderdescription hidden sm:block sm:w-[100%] h-screen bg-white border-box`} id = {`description-${clientId}`} key = {`description-${clientId}`}>
                <EditForm id = {id} description = {currDesc} taskName = {task} isDone = {isDone} dueDate = {currDueDate} onEdit = {(data: any) => handleNameChange(data)} path = {path}/>
            </div>) : null
        
        
        

        const container2 = document.getElementById('rightsidebar-mobile');
        root2 = container2? createRoot(container2) : null

        root2? root2.render(
            <Popup id = {id} description = {currDesc} taskName = {task} isDone = {isDone} 
            dueDate = {currDueDate} onEdit = {(data: any) => handleNameChange(data)} path = {path}
            clientId = {clientId}/>
        ) : null

        setRightBar(root);
    }

    const handleHighlight = (event:any) => {
        if (typeof document !== 'undefined'){
            const oldTarget = document.querySelectorAll(".task-desc.bg-light-blue")[0];
            oldTarget?.classList.remove('bg-light-blue');
            oldTarget?.classList.add('bg-white');
        
            event.currentTarget.classList.remove('bg-white');
            event.currentTarget.classList.add('bg-light-blue');
        }
    }


    return(
        <div className = {`task-desc ${path !== "/completed" && pastDue? "text-dark-red" : "text-black"} ${path === "/completed"? "text-dark-green" : ""}`} 
            key = {clientId}  id = {clientId}
            onClick = {(e) => {
            handleHighlight(e)
            descriptionHandler()
            }}>
            <div className = "p-2 w-[100%] xsm:w-[70%] sm:w-[60%] md:w-[80%] overflow-hidden text-ellipsis block whitespace-nowrap" title = {task}>
                <div className = {`taskName`}>{task}</div>
            </div>
            <div className = "p-2 hidden xsm:block xsm:w-[20%] sm:w-[40%] md:w-[20%] overflow-hidden text-ellipsis whitespace-nowrap">
                <div className = {`taskDate`}>{dateString}</div>
            </div>
            <div className = "m-auto p-2 w-fit cursor-pointer" onClick = {(e) => completeHandler(e)}>
                {!isDone? (<Image src = "/assets/check-mark.svg" title = "Mark as complete" alt = "Complete" width = {28} height = {28}/>) 
                : (<Image src = "/assets/incomplete.svg" title = "Mark as incomplete" alt = "Incomplete" width = {28} height = {28}/>)}
            </div>
            <div className = "m-auto p-2 w-fit cursor-pointer" onClick = {(e) => deleteHandler(e)}>
                <Image src = "/assets/trash-can.svg" title = "Delete" alt = "Delete" width = {28} height = {28}/>
            </div>
        </div>
    )
}


export default RenderDescription;