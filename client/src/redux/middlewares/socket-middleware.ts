//@ts-nocheck
import { useSocket } from "@/components/socket-provider"
import { useState } from "react"
import { setPrefetchCompleted } from "../prefetchSlice"
import io from "socket.io-client"

// Create the socket instance
const socket = io("http://localhost:3000");

const socketMiddleware = (store) => {


    socket.on('prefetchingCompleted', (data) => {

        console.log("The socket prefetch data received: ", data)
        store.dispatch(setPrefetchCompleted(true))
    })

    return (next) => (action) => {
        return next(action)
    }
}

export default socketMiddleware
