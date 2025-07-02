import express from 'express';
import dotenv from "dotenv"
import postrouter from './routers/post-router';


dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use('/api/v1', postrouter)

app.listen(PORT, () => {
    console.log(`server is running PORT : ${PORT}`)
})