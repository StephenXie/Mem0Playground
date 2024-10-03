"use client"


import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"
import LoginPage from "./LoginPage"
import Dashboard from "./Dashboard"
const HomePage = () => {
    const { data: session } = useSession()

    return (
        <>
        {session ? (
            <>
            <Dashboard />
            </> ) : (
            <>
            <LoginPage />
            </>
            )
            }
        </>
    )
}

export default HomePage