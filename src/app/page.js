"use client"

import useFetch from "@/hooks/UseFetch";
import { useEffect } from "react";

export default function Home() {
    const { data, fetch } = useFetch({ url: "https://api.tvmaze.com/shows/26856" })
    useEffect(() => {
        const call = async ()=>{
            await fetch()
        }
        call()
    }, [])
    console.log(data);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

            </main>
        </div>
    );
}
