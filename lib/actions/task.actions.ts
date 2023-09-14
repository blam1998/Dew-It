"use server"

import {connectToDB} from '../mongoose';
import { FilterQuery, SortOrder } from 'mongoose';
import User from '../models/user.model';
import Task from '../models/task.model';
import mongoose from "mongoose";
import { revalidatePath } from 'next/cache';

interface Props{
    userId: String,
    dueDate: Date,
    taskName: string,
    description: string,
    pathName: string,
    timeZoneoffset: Number
}


export async function addTask({
    userId,
    dueDate,
    description,
    taskName,
    pathName,
    timeZoneoffset,
} : Props){
    try{
        connectToDB();

        //taskName, isDone, author, dueDate, description

        const task = await Task.create({
            taskName: taskName,
            isDone: false,
            author: userId,
            dueDate: dueDate,
            description: description,
            timeOffset: timeZoneoffset
        })

        await User.findByIdAndUpdate(userId,
            {$push: {tasks: task}})
        
        revalidatePath(pathName);
    }
    catch(error:any){
        throw new Error(`Error adding task: ${error.message}`);
    }
}

export async function fetchAllTask(userId : {userId: mongoose.Types.ObjectId}){
    try{

        connectToDB();
        const currUserTasks = await Task.find({author: {$in:[userId]}})
        .find({isDone: {$in:[false]}})
        .populate({
            path: 'author',
            model: User,
            select: "_id username",
            populate:{
                path: 'tasks',
                model: Task,
                select: "_id taskName isDone description dueDate timeOffset"
            }
        }).exec();

        var finalUserTasks:any =  [];

        currUserTasks.map((c,i) => {
            var objTime = new Date(c.dueDate.getTime() - (c.timeOffset * 60000));
            c.dueDate = objTime
            finalUserTasks.push(c);
        })


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
        const currUserTasks = await Task.find({author: {$in:[userId]}})
        .find({isDone: {$in:[true]}})
        .populate({
            path: 'author',
            model: User,
            select: "_id username",
            populate:{
                path: 'tasks',
                model: Task,
                select: "_id taskName isDone description dueDate timeOffset"
            }
        }).exec();

        var finalUserTasks:any =  [];

        currUserTasks.map((c,i) => {
            var objTime = new Date(c.dueDate.getTime() - (c.timeOffset * 60000));
            c.dueDate = objTime
            finalUserTasks.push(c);
        })

        return finalUserTasks;

    }
    catch(error:any){
        throw new Error(`Error fetching all tasks: ${error.message}`)
    }
}

export async function updateTaskStatus(
    id: any, isDone: boolean, path: string){
    try{
        connectToDB();
        const filter = {_id: id}
        const update = {$set: {isDone: !isDone}}

        const result =  await Task.updateOne(filter,update);
        await revalidatePath(path);
    }
    catch(error:any){
        throw new Error(`Failed to update task status: ${error.message}`)
    }
}

export async function deleteTask(id: string, path: string, userId: string){
    try{
        connectToDB();
        const filter =  {_id: id}
        const job = await Task.deleteOne(filter);

        //new Code
        const userDelete = await User.findByIdAndUpdate({_id: userId},
            {$pull: {tasks: id}})
        
        
        revalidatePath(path);
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
        specificDate.setHours(23,59,59,0);



        

        connectToDB();
        const currUserTasks = await Task.find({author: {$in:[userId]}})
        .find({isDone: {$in:[false]}})
        .populate({
            path: 'author',
            model: User,
            select: "_id username",
            populate:{
                path: 'tasks',
                model: Task,
                select: "_id taskName isDone description dueDate timeOffset"
            }
        }).exec();

        var finalUserTasks:any =  [];

        currUserTasks.map((c,i) => {
            var objTime = new Date(c.dueDate.getTime() - (c.timeOffset * 60000));
            if (objTime >= startDate && objTime <= specificDate){
                c.dueDate = objTime
                finalUserTasks.push(c);
            }
        })

        return finalUserTasks;
    }
    catch(error:any){
        throw new Error(`Error fetching all tasks: ${error.message}`)
    }
}

interface update_Params{
    id: mongoose.Types.ObjectId,
    isDone: boolean, 
    description: string, 
    taskName: string, 
    dueDate: Date,
    pathName: string,
    timeZoneoffset: Number
}

export async function updateTask( data : update_Params){
    try{
        connectToDB();

        const filter = {_id: data.id}
        const update = {$set: 
            {
                isDone: data.isDone,
                description: data.description,
                taskName: data.taskName,
                dueDate: data.dueDate,
                timeOffset: data.timeZoneoffset
            }}

        const result =  await Task.updateOne(filter,update);
        revalidatePath(data.pathName);
    }
    catch(error:any){
        throw new Error(`Failed to update task: ${error.message}`)
    }
}
