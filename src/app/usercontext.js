"use client"

import { createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserComponent({ children }) {

    let localuser = {}
    const userString = localStorage.getItem('user')
    if (userString) {
        localuser = JSON.parse(userString)
    }
    const [user, setUser] = useState(localuser)
    const value = { user, setUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
