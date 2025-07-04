import express from 'express';
import authRouter from './routers/auth';
import productRouter from './routers/product'
import { corsMiddleware } from './middlewares/cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(corsMiddleware)
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }
}))


app.use('/auth', authRouter)
app.use('/products', productRouter)


app.listen(PORT, () => {
    console.log(`server is running PORT ${PORT}`)
})