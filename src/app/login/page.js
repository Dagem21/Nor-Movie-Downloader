"use client"

import { login } from "@/mongo/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "../usercontext";

export default function Login() {
    const { setUser } = useContext(UserContext)
    const router = useRouter()

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [loginError, setLoginError] = useState()

    const handleChange = (e) => {
        setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginResponse = await login(loginData.email, loginData.password)
        if (loginResponse?.success) {
            setUser(loginResponse?.user)
            localStorage.setItem('user', JSON.stringify(loginResponse?.user))
            router.replace('/')
        }
        else {
            setLoginError(loginResponse?.error)
        }
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-2xl font-bold">Login</h1>
                <form className="w-96 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@.com"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="***********"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                        {
                            loginError &&
                            <p className="mt-1 text-sm font-small dark:text-red-500">{loginError}</p>
                        }
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </div>
                    <div className="flex justify-center">
                        <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">Don't have an account? <Link href='/register'>Sign Up</Link></p>
                    </div>
                </form>

            </main>
        </div>
    );
}
