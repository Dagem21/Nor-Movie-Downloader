const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        movieID: {
            type: String,
            required: true,
        },
        movieName: {
            type: String,
            required: true,
        },
        lastEpisode: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            default: 'Running',
        },
    }, { timestamps: true })

module.exports = mongoose.models.favorite || mongoose.model('favorite', FavoriteSchema)