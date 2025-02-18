"use client"

import Header from "@/components/header/header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../usercontext";
import useFetch from "@/hooks/UseFetch";
import { useSearchParams } from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams()

    const { data, isLoading, fetchData } = useFetch({
        method: 'GET'
    })

    const [movies, setMovies] = useState()
    const [page, setPage]= useState(1)

    useEffect(() => {
        const query = searchParams.get('query')
        fetchData({
            url: `https://1337x.to/search/${query}/${page}/`,
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.5',
                'upgrade-insecure-requests': '1',
            }
        })
    }, [searchParams])

    useEffect(() => {
        if (data && !isLoading) {
            console.log(data)
        }
    }, [data, isLoading])

    return (
        <div className="h-screen">
            <Header />
            <div className="">

            </div>
        </div>
    );
}
