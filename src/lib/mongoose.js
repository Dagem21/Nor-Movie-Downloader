"use server"
import mongoose from "mongoose";

export default async function connectMongo() {
    try {
        const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
        if (!MONGODB_URI) {
            return false;
        }

        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        
        return true;
    }
    catch (e) {
        console.log(e)
        return false;
    }
}