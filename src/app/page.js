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
    const [selectedSeason, setSelectedSeason] = useState()

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

    useEffect(() => {
        if (episodeData && !episodesLoading) {
            function compare(a, b) {
                if (a.number < b.number) {
                    return 1;
                }
                if (a.number > b.number) {
                    return -1;
                }
                return 0;
            }
            let sortedEpisodes = [...episodeData]
            sortedEpisodes.sort(compare);
            setSelectedSeason(sortedEpisodes)
        }
    }, [episodeData, episodesLoading])

    const handleSelected = (movieID) => {
        fetchData({ url: `https://api.tvmaze.com/shows/${movieID}` })
        seasonFetch({ url: `https://api.tvmaze.com/shows/${movieID}/seasons` })
    }

    const seasonHandler = (seasonID) => {
        episodeFetch({ url: `https://api.tvmaze.com/seasons/${seasonID}/episodes` })
    }

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
                                <div className="flex justify-center mr-4 w-96 h-96">
                                    <img className="w-96 object-cover" src={selectedMovie?.data?.image?.original} />
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
                                        <div className="mt-5">
                                            <div className="w-fit">
                                                <select
                                                    id="season"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => { seasonHandler(e.target.value) }}
                                                >
                                                    <option disabled>Season</option>
                                                    {selectedMovie.seasons.map((season) => {
                                                        return <option key={season.id} value={season?.id}>Season {season?.number}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    }
                                    {
                                        selectedSeason &&
                                        <div className="mt-5">
                                            {selectedSeason.map((episode) => {
                                                return <section key={episode.id} className="mb-3">
                                                    <label>
                                                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                                        <span className="block max-h-14 overflow-hidden rounded-lg bg-gray-700 px-4 py-0 text-blue-300 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                                                            <div className="flex h-14 cursor-pointer justify-between items-center font-bold">
                                                                <h1>Episode: {episode?.number} - {episode?.name}</h1>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-lg px-4 py-4 text-center inline-flex items-center"
                                                                    onClick={() => {
                                                                        router.push(`/download?query=${selectedMovie?.data?.name} s${episode?.season.toString().padStart(2, '0')}e${episode?.number.toString().padStart(2, '0')}`)
                                                                    }}
                                                                >
                                                                    <svg width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12.1893L14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697C15.8232 10.7626 15.8232 11.2374 15.5303 11.5303L12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303L8.46967 11.5303C8.17678 11.2374 8.17678 10.7626 8.46967 10.4697C8.76256 10.1768 9.23744 10.1768 9.53033 10.4697L11.25 12.1893V7C11.25 6.58579 11.5858 6.25 12 6.25ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z" fill="#3b5998" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="ml-10">
                                                                <p className="mb-2"> <span className="text-sm font-bold text-gray-300">Run Time: </span>{episode?.runtime} Minutes</p>
                                                                <p className="mb-2"> <span className="text-sm font-bold text-gray-300">Rating: </span>{episode?.rating?.average}</p>
                                                                <p className="mb-2"> <span className="text-sm font-bold text-gray-300">Air Date: </span>{episode?.airdate ? new Date(episode?.airdate).toDateString() : 'N/A'}</p>
                                                                <p className="mb-2"> <span className="text-sm font-bold text-gray-300">Summary: </span>{episode?.summary?.replace(/(<([^>]+)>)/gi, "")}</p>
                                                            </div>
                                                        </span>
                                                    </label>
                                                </section>
                                            })}
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
