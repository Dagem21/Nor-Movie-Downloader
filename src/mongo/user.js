"use server"

import connectMongo from '@/lib/mongoose';
import mongoose from "mongoose";

require("../models/user");
const User = mongoose.model("user");

export const createUser = async (username, email, password) => {
    try {
        const connRes = await connectMongo()
        if (connRes) {
            await User.create({
                username,
                email,
                password
            })
            return ({ created: true, error: null })
        }
        else {
            return ({ created: false, error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ created: false, error: e })
    }
}
export const login = async (email, password) => {
    try {
        const connRes = connectMongo()
        if (connRes) {
            const user = await User.findOne({ email })
            if (user) {
                if (user.password === password) {
                    if(user.status !== "Active"){
                        return ({ success: false, error: "Your account is inactive!" })
                    }
                    return ({ success: true, user: {userID: user._id.toJSON(), username: user.username, email: user.email}})
                }
            }
            return ({ success: false, error: "Invalid credentials!" })
        }
        else {
            return ({ success: false, error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ success: false, error: e.message })
    }
}
export const changePassword = async (email, password, newPassword) => { }