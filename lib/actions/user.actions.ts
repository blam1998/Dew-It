"use server"
import { revalidatePath } from 'next/cache';
import {connectToDB} from '../mongoose';
import { FilterQuery, SortOrder } from 'mongoose';
import User from '../models/user.model';


interface Props{
    id: string,
    username: string,
    name: string,
}


export async function checkNewUser({
    id,
    username,
    name,
} : Props) : Promise<void>{
    try{
        connectToDB();
        console.log("Checking new user");
        const hasUser = await User.findOne({
            id: id,
        })

        if (hasUser) return;

        await addNewUser({id,username,name});
        
    }
    catch(error: any){
        throw new Error(`Failed to update user: ${error.message}`);
    }
}

export async function addNewUser({
    id,
    username,
    name
} : Props){
    try{
        connectToDB();
        
        const insertUser = await User.findOneAndUpdate(
            {id: id},
            {
            username: username,
            name: name,
            dateJoined: Date.now,
            taskCount: "0",
            task: []},
            {upsert: true}
        );
    }
    catch(error:any){
        throw new Error(`Failed to add new user: ${error.message}`);
    }
}