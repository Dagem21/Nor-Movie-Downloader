"use client"

import { createUser } from "@/mongo/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const router = useRouter()

    const [registerData, setRegisterData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const initError = {
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        response: null
    }
    const [registerDataError, setRegisterDataError] = useState(initError)

    const handleChange = (e) => {
        setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }))

        if (e.target.name === "confirmPassword" && registerData.password !== e.target.value) {
            setRegisterDataError(prev => ({ ...prev, "confirmPassword": "Confirm your password!" }))
        }
        else {
            setRegisterDataError(prev => ({ ...prev, "confirmPassword": null }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setRegisterDataError(initError)

        const createResponse = await createUser(registerData.username, registerData.email, registerData.password)
        if (createResponse.created) {
            router.replace('/login')
        }
        else {
            setRegisterDataError(prev => ({ ...prev, response: createResponse.error }))
        }
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <form className="w-96 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@.com"
                            required
                            value={registerData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={registerData.username}
                            onChange={handleChange}
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
                            required
                            value={registerData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="***********"
                            required
                            value={registerData.confirmPassword}
                            onChange={handleChange}
                        />
                        {
                            registerDataError.confirmPassword &&
                            <p className="mt-1 text-sm font-small dark:text-red-500">{registerDataError.confirmPassword}</p>
                        }
                    </div>
                    {
                        registerDataError.response &&
                        <p className="my-1 text-sm font-small dark:text-red-500">{registerDataError.response}</p>
                    }
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">Already registered? <Link href='/login'>Login</Link></p>
                    </div>
                </form>

            </main>
        </div>
    );
}
