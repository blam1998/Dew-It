"use client"
import React, { DOMElement, useState, useEffect } from 'react'
import RenderDescription from './RenderDescription'


interface RenderContainerProps{
    allTasks: Array<any>
    userId: string
}

export default function RenderContainer(props : RenderContainerProps) {
    const allTasks = props.allTasks;
    const userId = props.userId;
    const [root, setRoot] = useState()

  return (
    <>
    {allTasks?.length !== 0? allTasks?.map((c:any,i:any) => {
            return(
              <div className = "w-[100%]" id = {"task-" + i.toString()} key = {c._id.toString()}>
                <RenderDescription 
                  taskName = {c.taskName}
                  description = {c.description}
                  id = {c._id.toString()}
                  dueDate = {c.dueDate}
                  isDone = {c.isDone}
                  clientId = {"task-"+c._id.toString()}
                  userId = {userId.toString()}
                />
              </div>
            )
          }) : (<div className = "noTask">No Tasks Completed</div>)
        }
    </>
  )
}
