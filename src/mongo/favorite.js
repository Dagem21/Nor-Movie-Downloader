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
            const movies = await Favorite.find({ userID }, { movieID: 1, movieName: 1, _id: 0 })
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

export const getFavoriteByShowID = async (userID, movieID) => {
    try {
        const connRes = await connectMongo()
        if (connRes) {
            console.log(userID, movieID)
            const movie = await Favorite.findOne({ userID, movieID })
            console.log(movie)
            if (movie) {
                return ({ movie: JSON.parse(JSON.stringify(movie)), error: null })
            }
            else {
                return ({ movie: null, error: null })
            }
        }
        else {
            return ({ movie: null, error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ movie: null, error: e })
    }
}

export const deleteFavorite = async (userID, movieID) => {
    try {
        const connRes = await connectMongo()
        if (connRes) {
            const delRes = await Favorite.deleteOne({ userID, movieID })
            if (delRes.deletedCount) {
                return ({ deleted: true, error: null })
            }
            return ({ deleted: false, error: "Could not delete movie!" })
        }
        else {
            return ({ movies: [], error: "Failed to connect to database!" })
        }
    }
    catch (e) {
        return ({ movies: [], error: e })
    }
}