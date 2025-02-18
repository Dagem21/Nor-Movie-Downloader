"use server"

import connectMongo from '@/lib/mongoose';
import mongoose from "mongoose";

require("../models/favorites");
const Favorite = mongoose.model("favorite");

export const addFavorite = async (userID, movieID, movieName, lastEpisode, status) => {
    try {
        const connRes = await connectMongo()
        if (connRes) {
            await Favorite.create({
                userID,
                movieID,
                movieName,
                status
            })
            return ({ added: true, error: null })
        }
        else {
            return ({ added: false, error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ added: false, error: e })
    }
}

export const getFavorite = async (userID) => {
    try {
        const connRes = await connectMongo()
        if (connRes) {
            const movies = await Favorite.find({ userID }, {movieID: 1, movieName: 1, _id: 0})
            console.log(movies);
            return ({ movies: JSON.parse(JSON.stringify(movies)), error: null })
        }
        else {
            return ({ movies: [], error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ movies: [], error: e })
    }
}