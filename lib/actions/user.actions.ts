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
    name
} : Props) : Promise<boolean>{
    try{
        connectToDB();
        console.log("Checking new user");
        const hasUser = await User.findOne({
            id: id,
        })

        return hasUser;

        
    }
    catch(error: any){
        console.log(error);
        throw new Error(`Failed to check user: ${error.message}`);
    }
}

export async function addNewUser({
    id,
    username,
    name
} : Props){
    try{
        connectToDB();
        console.log("Adding new user.")
        const currentDate = new Date();
        const insertUser = await User.findOneAndUpdate(
            {id: id},
            {
            username: username,
            name: name,
            dateJoined: `${currentDate.getMonth()}-${currentDate.getDate()}-${currentDate.getFullYear()}`,
            taskCount: "0",
            task: []},
            {upsert: true}
        );
    }
    catch(error:any){
        throw new Error(`Failed to add new user: ${error.message}`);
    }
}

export async function fetchUser(id: string){
    try{
        connectToDB();
        return await User.findOne({id: id});
    }
    catch(error:any){
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}