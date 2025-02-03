import express from 'express'
import promptRoutes from "./routes/prompt.route.js" 
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
// const allowedOrigins = [
//     "http://localhost:5173"
// ]

// const corsOptions = {
//     origin: allowedOrigins,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed request methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: true, // Allow cookies if needed
// }



const app = express()


app.use(cors())

app.use(express.json());

app.use('/api', promptRoutes)


const server = app.listen(3000, () => {
    console.log("Server is running on port 3000")
})