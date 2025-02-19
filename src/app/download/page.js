"use client"

import Header from "@/components/header/header";
import { Suspense, useEffect, useState } from "react";
import useFetch from "@/hooks/UseFetch";
import { useSearchParams } from "next/navigation";
import { parse, parseTorrent } from "@/lib/parser";

export default function Search() {
    return <Suspense>
        <SearchPage />
    </Suspense>
}

function SearchPage() {
    const searchParams = useSearchParams()

    const { data, isLoading, fetchData } = useFetch({
        method: 'GET'
    })

    const { data: torrentData, isLoading: torrentLoading, fetchData: fetchTorrent } = useFetch({
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
            setTotalPages(prev=> torrents.lastPage ?? prev)
        }
    }, [data, isLoading])

    useEffect(() => {
        if (torrentData && !torrentLoading) {
            const torrent = parseTorrent(torrentData)
            window.open(torrent)
        }
    }, [torrentData, torrentLoading])

    const handleDownload = (link) => {
        fetchTorrent({
            url: link,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.5',
                'upgrade-insecure-requests': '1',
            }
        })
    }

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
                                    <th scope="col" className="px-6 py-3">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {torrents.map((torrent, index) => {
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{torrent?.name}</td>
                                        <td className="px-6 py-4">{torrent?.size}</td>
                                        <td className="px-6 py-4">{torrent?.time}</td>
                                        <td className="px-6 py-4">{torrent?.seeders}</td>
                                        <td className="px-6 py-4">{torrent?.leechers}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                className="rounded-lg text-center inline-flex items-center"
                                                onClick={() => { handleDownload(torrent?.link) }}
                                            >
                                                <svg width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12.1893L14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697C15.8232 10.7626 15.8232 11.2374 15.5303 11.5303L12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303L8.46967 11.5303C8.17678 11.2374 8.17678 10.7626 8.46967 10.4697C8.76256 10.1768 9.23744 10.1768 9.53033 10.4697L11.25 12.1893V7C11.25 6.58579 11.5858 6.25 12 6.25ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z" fill="#3b5998" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="my-3">
                            <div className="flex justify-center items-center">
                                <button disabled={page <= 1} onClick={() => { setPage(prev => prev - 1) }} className="rounded-md border border-blue-500 mx-2 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <p className="text-slate-600">
                                    Page <strong className="text-slate-800">{page}</strong> of&nbsp;<strong className="text-slate-800">{totalPages}</strong>
                                </p>

                                <button disabled={page === totalPages} onClick={() => { setPage(prev => prev + 1) }} className="rounded-md border border-blue-500 mx-2 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
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
