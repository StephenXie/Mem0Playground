"use client"


import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"
import LoginPage from "./LoginPage"

const LoginButton = () => {
    const { data: session } = useSession()

    return (
        <>
        {session ? (
            <>
            <h1>Dashboard</h1>
            <p>Welcome, {session?.user?.email || session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
            </> ) : (
            <>
            <LoginPage />
            </>
            )
            }
        </>
    )
}

export default LoginButton