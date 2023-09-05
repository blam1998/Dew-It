import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery",true);

    if (isConnected){
        return;
    }

    if (!process.env.MONGODB_URL){
        console.log("No DB URL.");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("mongoDB is connected");
    }
    catch(error:any){
        throw new Error(`Failed to connect to DB: ${error.message}`);
    }
}