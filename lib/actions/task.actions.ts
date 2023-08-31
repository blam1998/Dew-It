"use server"
import { revalidatePath } from 'next/cache';
import {connectToDB} from '../mongoose';
import { FilterQuery, SortOrder } from 'mongoose';
import User from '../models/user.model';
import Task from '../models/task.model';
import mongoose from "mongoose";
import { ObjectId } from 'mongoose';

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

export async function fetchAllTask(userId : {userId: mongoose.Schema.Types.ObjectId}){
    try{
        connectToDB();
        const currUserTasks = Task.find({author: {$in:[userId]}})
        .find({isDone: {$in:[false]}})
        .populate({
            path: 'author',
            model: User,
            select: "_id username",
            populate:{
                path: 'tasks',
                model: Task,
                select: "_id taskName isDone description dueDate"
            }
        }).exec();

        return currUserTasks;
    }
    catch(error:any){
        throw new Error(`Error fetching all tasks: ${error.message}`)
    }

    return null;
}

export async function fetchAllCompletedTask(userId: {userId: mongoose.Schema.Types.ObjectId}){
    try{
        connectToDB();
        const currUserTasks = Task.find({author: {$in:[userId]}})
        .find({isDone: {$in:[true]}})
        .populate({
            path: 'author',
            model: User,
            select: "_id username",
            populate:{
                path: 'tasks',
                model: Task,
                select: "_id taskName isDone description dueDate"
            }
        }).exec();

        return currUserTasks;
    }
    catch(error:any){
        throw new Error(`Error fetching all tasks: ${error.message}`)
    }
}

export async function updateTaskStatus(
    id: any, isDone: boolean){
    try{
        connectToDB();
        const filter = {_id: id}
        const update = {$set: {isDone: !isDone}}

        const result =  await Task.updateOne(filter,update);

    }
    catch(error:any){
        throw new Error(`Failed to update task status: ${error.message}`)
    }
}


export async function deleteTask(id: any){
    try{
        connectToDB();
        const target = new mongoose.Types.ObjectId(id)
        const filter =  {_id: id}
        const job = await Task.deleteOne(filter);

    }
    catch(error:any){
        throw new Error(`Failed to delete task: ${error.message}`)
    }
}

export async function fetchDateTask(userId : {userId: mongoose.Schema.Types.ObjectId}, dateCounter: string, date: string){
    try{
        const startDate = new Date(date); //todo
        var specificDate = new Date(date);
        specificDate.setDate(startDate.getDate() + Number(dateCounter)); //todo
        startDate.setHours(0,0,0,0);
        specificDate.setHours(0,0,0,0);

        connectToDB();
        const currUserTasks = Task.find({author: {$in:[userId]}})
        .find({isDone: {$in:[false]}})
        .find({dueDate: {
            $gte: startDate,
            $lte: specificDate
        }})
        .populate({
            path: 'author',
            model: User,
            select: "_id username",
            populate:{
                path: 'tasks',
                model: Task,
                select: "_id taskName isDone description dueDate"
            }
        }).exec();

        return currUserTasks;
    }
    catch(error:any){
        throw new Error(`Error fetching all tasks: ${error.message}`)
    }
}