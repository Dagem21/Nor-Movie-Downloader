"use server"
import mongoose from "mongoose";

export default async function connectMongo() {
    try {
        const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error(
                "Please define the MONGODB_URI environment variable inside .env.local",
            );
        }

        await mongoose.connect(MONGODB_URI);
        return true;
    }
    catch (e) {
        return false;
    }
}