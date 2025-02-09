import express from 'express'
import promptRoutes from "./routes/prompt.route.js" 
import detailsRoutes from "./routes/details.route.js"
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conneted to MONGO"))
.catch((err) => console.log("Coudlnt connect to DB: ", err))


// console.log("THE MONGO URI: ", process.env.MONGO_URI)

const app = express()


app.use(cors())

app.use(express.json());

app.use('/api', promptRoutes)
app.use('/api', detailsRoutes)


const server = app.listen(3000, () => {
    console.log("Server is running on port 3000")
})