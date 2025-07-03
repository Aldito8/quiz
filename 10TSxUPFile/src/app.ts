import express from 'express';
import authRouter from './routers/auth';
import { corsMiddleware } from './middlewares/cors';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(corsMiddleware)

app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`server is running PORT ${PORT}`)
})