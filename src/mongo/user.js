const { connectMongo } = require(".")
const mongoose = require('mongoose')

require("../models/user");
const User = mongoose.model("User");

export const createUser = async (name, email, password) => {
    const connRes = connectMongo()
    if (connRes) {
        await User.create({
            name,
            email,
            password
        })
        return ({ created: true, error: null })
    }
    else {
        return ({ created: false, error: "Failed to connect to database!" })
    }
}
export const login = async (email, password) => {
    const connRes = connectMongo()
    if (connRes) {
        const user = await User.findOne({ email })
        if (user) {
            if (user.password === password) {
                return ({ success: true })
            }
        }
        return ({ success: false, error: "Invalid credentials!" })
    }
    else {
        return ({ created: false, error: "Failed to connect to database!" })
    }
}
export const changePassword = async (email, password, newPassword) => { }