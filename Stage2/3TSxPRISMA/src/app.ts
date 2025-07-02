import express from "express";
import productrouter from "./routes/product-route";
import orderrouter from "./routes/order-route";

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/api/cart', productrouter)
app.use('/api/cart', orderrouter)

app.listen(PORT, () => {
    console.log(`server is running : PORT ${PORT}`)
})