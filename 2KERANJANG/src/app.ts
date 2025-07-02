import express from "express"
import productRouter from "./routes/product-route"
import orderRouter from "./routes/order-route"

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/api/cart', productRouter)
app.use('/api/cart', orderRouter)

app.listen(PORT, () => {
    console.log(`jalan pada port ${PORT}`)
})