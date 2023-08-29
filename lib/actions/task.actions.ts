"use server"
import { revalidatePath } from 'next/cache';
import {connectToDB} from '../mongoose';
import { FilterQuery, SortOrder } from 'mongoose';
import User from '../models/user.model';
import Task from '../models/task.model';
import mongoose from "mongoose";

interface Props{
    userId: mongoose.Schema.Types.ObjectId,
    dueDate: string,
    taskName: string,
    description: string
}

export async function addTask({
    userId,
    dueDate,
    description,
    taskName
} : Props){
    try{
        connectToDB();

        //taskName, isDone, author, dueDate, description
        const task = await Task.create({
            taskName: taskName,
            isDone: false,
            author: userId,
            dueDate: dueDate,
            description: description
        })

        await User.findByIdAndUpdate(userId,
            {$push: {tasks: task}})
    }
    catch(error:any){
        throw new Error(`Error adding task: ${error.message}`);
    }
}

