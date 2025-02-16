const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Active',
        },
        confirmationOTP: {
            type: String,
        }
    }, { timestamps: true })

module.exports = mongoose.models.user || mongoose.model('user', UserSchema)