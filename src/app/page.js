"use client"

import Header from "@/components/header/header";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./usercontext";
import { getFavorite } from "@/mongo/favorite";
import useFetch from "@/hooks/UseFetch";

export default function Home() {
    const { user } = useContext(UserContext)

    const { data, isLoading, fetchData } = useFetch({
        method: 'GET'
    })
    const { data: seasonData, isLoading: seasonLoading, fetchData: seasonFetch } = useFetch({
        method: 'GET'
    })
    const { data: episodeData, isLoading: episodesLoading, fetchData: episodeFetch } = useFetch({
        method: 'GET'
    })

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

    useEffect(() => {
        if (data && !isLoading && seasonData && !seasonLoading) {
            function compare(a, b) {
                if (a.number < b.number) {
                    return 1;
                }
                if (a.number > b.number) {
                    return -1;
                }
                return 0;
            }
            let sortedSeasons = [...seasonData]
            sortedSeasons.sort(compare);
            setSelectedMovie({ data, seasons: sortedSeasons })
        }
    }, [data, isLoading, seasonData, seasonLoading])

    console.log(selectedMovie?.seasons);

    const handleSelected = (movieID) => {
        fetchData({ url: `https://api.tvmaze.com/shows/${movieID}` })
        seasonFetch({ url: `https://api.tvmaze.com/shows/${movieID}/seasons` })
    }
    console.log();

    return (
        <div className="h-screen">
            <Header />
            <div className="grid grid-cols-4">
                <div className="col-start-1 col-span-1 border border-solid shadow-xl rounded-xl border-stone-600 ml-3 p-3 h-fit">
                    <h1 className="text-l font-bold text-gray-300 text-center mb-3">Favorite</h1>
                    {
                        movies.map((movie) => {
                            return <h1
                                key={movie?.movieID}
                                className={`py-1 text-sm font-bold ${selectedMovie?.data?.id + '' === movie?.movieID ? 'border-r border-solid border-indigo-600' : ''}`}
                                onClick={() => { handleSelected(movie?.movieID) }}
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
                            <div className="col-start-2 col-span-3 px-10 py-3 flex">
                                <div className="flex justify-center mr-4">
                                    <img className="max-w-64" src={selectedMovie?.data?.image?.original} />
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl font-bold text-gray-300 text-start">{selectedMovie?.data?.name}</h1>
                                        <button
                                            type="button"
                                            className="text-black bg-red-500 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                                            onClick={() => { }}
                                        >
                                            <svg className="mr-2" width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 7H20" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Rating: </span>{selectedMovie?.data?.rating?.average}</h1>
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Status: </span>{selectedMovie?.data?.status}</h1>
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Genres: </span>{selectedMovie?.data?.genres?.join(', ')}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Premiered:  </span>{selectedMovie?.data?.premiered ? new Date(selectedMovie?.data?.premiered).toDateString() : 'N/A'}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-start"><span className="text-sm font-bold text-gray-300">Summary:  </span>{selectedMovie?.data?.summary?.replace(/(<([^>]+)>)/gi, "")}</h1>
                                    </div>
                                    {
                                        selectedMovie?.seasons &&
                                        <div className="mt-5 overflow-x-scroll bg-red-500">
                                            <div className="flex">
                                                {selectedMovie.seasons.map((season) => {
                                                    return <button className="text-nowrap mr-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                        Season {season?.number}
                                                    </button>
                                                })}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            <h1 className="text-xl font-bold">Select a movie!</h1>
                    }
                </div>
            </div>
        </div>
    );
}
