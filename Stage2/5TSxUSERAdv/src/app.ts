import express from "express"
import productrouter from "./routers/product-router"
import orderrouter from "./routers/order-router"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api", productrouter)
app.use("/api", orderrouter)

app.listen(PORT, () => {
    console.log(`server is running : PORT ${PORT}`)
})