"use client"

import Header from "@/components/header/header";
import { addFavorite } from "@/mongo/favorite";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../usercontext";
import useFetch from "@/hooks/UseFetch";

export default function Search() {
    const { user } = useContext(UserContext)

    const { data, isLoading, fetchData } = useFetch({
        method: 'GET'
    })

    const [searchPhrase, setSearchPhrase] = useState("")
    const [movies, setMovies] = useState()
    const [selectedMovie, setSelectedMovie] = useState()

    const handleSearch = (e) => {
        e.preventDefault()
        fetchData({ url: `https://api.tvmaze.com/search/shows?q=${searchPhrase}` })
    }

    useEffect(() => {
        if (data && !isLoading) {
            setMovies(data)
        }
    }, [data, isLoading])

    const handleAddFavorite = async () => {
        const addResponse = await addFavorite(user.userID, selectedMovie?.show?.id, selectedMovie?.show?.name, null, selectedMovie?.show?.status)
    }
    return (
        <div className="h-screen">
            <Header />
            <div className="">
                <div>
                    <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Movie name"
                                value={searchPhrase}
                                onChange={(e) => { setSearchPhrase(e.target.value) }}
                                required
                            />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
                {
                    movies && movies.length > 0 &&
                    <div className="grid grid-cols-4 pt-3">
                        <div className="col-start-1 col-span-1 border border-solid shadow-xl rounded-xl border-stone-600 ml-3 p-3">
                            <h1 className="text-l font-bold text-gray-300 text-center">Results</h1>
                            {
                                movies.map((movie) => {
                                    return <h1
                                        key={movie?.show?.id}
                                        className={`py-1 text-sm font-bold cursor-pointer ${selectedMovie === movie ? 'border-r border-solid border-indigo-600' : ''}`}
                                        onClick={() => { setSelectedMovie(movie) }}
                                    >
                                        {movie?.show?.name}
                                    </h1>
                                })
                            }
                        </div>
                        {
                            selectedMovie &&
                            <div className="col-start-2 col-span-3 px-10 py-3 flex">
                                <div className="flex justify-center mr-4">
                                    <img className="max-w-64" src={selectedMovie?.show?.image?.original} />
                                </div>
                                <div>
                                    <div className="max-w-full">
                                        <h1 className="text-2xl font-bold text-gray-300 text-start">{selectedMovie?.show?.name}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Rating: </span>{selectedMovie?.show?.rating?.average}</h1>
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Status: </span>{selectedMovie?.show?.status}</h1>
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Genres: </span>{selectedMovie?.show?.genres?.join(', ')}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Premiered:  </span>{selectedMovie?.show?.premiered ? new Date(selectedMovie?.show?.premiered).toDateString() : 'N/A'}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-start"><span className="text-sm font-bold text-gray-300">Summary:  </span>{selectedMovie?.show?.summary?.replace(/(<([^>]+)>)/gi, "")}</h1>
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            type="button"
                                            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                                            onClick={handleAddFavorite}
                                        >
                                            <svg className="mr-2" fill="#00bd0d" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 45.402 45.402" stroke="#00bd0d" strokeWidth="2.6333159999999998">
                                                <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                                            </svg>
                                            Add to Favorite
                                        </button>
                                    </div>
                                </div>



                            </div>
                        }
                    </div>
                }
                {
                    movies && movies.length === 0 &&
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-l font-bold text-gray-300 text-center">No result found!</h1>
                    </div>
                }
            </div>
        </div>
    );
}
