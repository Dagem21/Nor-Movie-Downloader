"use client"

import Header from "@/components/header/header";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./usercontext";
import { getFavorite } from "@/mongo/favorite";

export default function Home() {
    const { user } = useContext(UserContext)
    const router = useRouter()
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState()

    useEffect(() => {
        const call = async () => {
            const moviesResponse = await getFavorite(user.userID)
            setMovies(moviesResponse?.movies)
        }
        call()
    }, [user])

    return (
        <div className="h-screen">
            <Header />
            <div className="grid grid-cols-4">
                <div className="col-start-1 col-span-1 border border-solid shadow-xl rounded-xl border-stone-600 ml-3 p-3">
                    <h1 className="text-l font-bold text-gray-300 text-center mb-3">Favorite</h1>
                    {
                        movies.map((movie) => {
                            return <h1
                                key={movie?.movieID}
                                className={`py-1 text-sm font-bold ${selectedMovie === movie ? 'border-r border-solid border-indigo-600' : ''}`}
                                onClick={() => { setSelectedMovie(movie) }}
                            >
                                {movie.movieName}
                            </h1>
                        })
                    }
                    <div className="flex justify-center mt-3">
                        <button
                            type="button"
                            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                            onClick={() => { router.push('/search') }}
                        >
                            <svg className="mr-2" fill="#00bd0d" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 45.402 45.402" stroke="#00bd0d" strokeWidth="2.6333159999999998">
                                <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                            </svg>
                            Add Movie
                        </button>
                    </div>
                </div>
                <div className="col-start-2 col-span-3 flex justify-center items-center">
                    {
                        selectedMovie ?
                            <div>

                            </div>
                            :
                            <h1 className="text-xl font-bold">Select a movie!</h1>
                    }
                </div>
            </div>
        </div>
    );
}
