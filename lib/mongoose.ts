import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery",true);
    console.log("Mongodb connection Hit.");

    if (isConnected){
        console.log("Already Connected");
        return;
    }

    if (!process.env.MONGODB_URI){
        console.log("No DB URL.");
        return;
    }

    try{
        console.log("Trying to connect to mongodb");
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("mongoDB is connected");
    }
    catch(error:any){
        throw new Error(`Failed to connect to DB: ${error.message}`);
    }
}