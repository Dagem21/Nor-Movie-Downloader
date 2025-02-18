"use client"

import Header from "@/components/header/header";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/UseFetch";
import { useSearchParams } from "next/navigation";
import { parse } from "@/lib/parser";

export default function Search() {
    const searchParams = useSearchParams()

    const { data, isLoading, fetchData } = useFetch({
        method: 'GET'
    })

    const [torrents, setTorrents] = useState()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const query = searchParams.get('query')
        fetchData({
            url: `https://1337x.to/search/${query}/${page}/`,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.5',
                'upgrade-insecure-requests': '1',
            }
        })
    }, [searchParams, page])

    useEffect(() => {
        if (data && !isLoading) {
            const torrents = parse(data)
            setTorrents(torrents.tors)
            setTotalPages(torrents.lastPage ?? totalPages)
        }
    }, [data, isLoading])

    return (
        <div className="h-screen">
            <Header />
            <div className="">
                <h1 className="text-xl text-center text-gray-400 mb-3">Torrent results for: <span className="font-bold text-blue-500">{searchParams.get('query')}</span></h1>
                {
                    torrents && torrents.length > 0 &&
                    <div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Size</th>
                                    <th scope="col" className="px-6 py-3">Time</th>
                                    <th scope="col" className="px-6 py-3">Seeders</th>
                                    <th scope="col" className="px-6 py-3">Leechers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {torrents.map((torrent) => {
                                    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{torrent?.name}</td>
                                        <td className="px-6 py-4">{torrent?.size}</td>
                                        <td className="px-6 py-4">{torrent?.time}</td>
                                        <td className="px-6 py-4">{torrent?.seeders}</td>
                                        <td className="px-6 py-4">{torrent?.leechers}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="my-3">
                            <div class="flex justify-center items-center">
                                <button disabled={page <= 1} onClick={()=>{setPage(prev=>prev-1)}} className="rounded-md border border-blue-500 mx-2 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <p className="text-slate-600">
                                    Page <strong class="text-slate-800">{page}</strong> of&nbsp;<strong className="text-slate-800">{totalPages}</strong>
                                </p>

                                <button disabled={page === totalPages} onClick={()=>{setPage(prev=>prev+1)}} className="rounded-md border border-blue-500 mx-2 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
