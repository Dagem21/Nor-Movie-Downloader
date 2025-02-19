"use server"

import { hashPass } from '@/lib/encryption';
import connectMongo from '@/lib/mongoose';
import mongoose from "mongoose";

require("../models/user");
const User = mongoose.model("user");

export const createUser = async (username, email, password) => {
    try {
        const connRes = await connectMongo()
        const encPass = hashPass(password)
        if (connRes) {
            await User.create({
                username,
                email,
                password: encPass
            })
            return ({ created: true, error: null })
        }
        else {
            return ({ created: false, error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ created: false, error: e.message })
    }
}
export const login = async (email, password) => {
    try {
        const connRes = connectMongo()
        if (connRes) {
            const user = await User.findOne({ email })
            if (user) {
                const encPass = hashPass(password)
                if (user.password === encPass) {
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