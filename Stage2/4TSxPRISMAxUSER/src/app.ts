import express from "express"
import userrouter from "./routers/user-route"
import postrouter from "./routers/post-route"


const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api", userrouter)
app.use("/api", postrouter)

app.listen(PORT, () => {
    console.log(`server is running : PORT ${PORT}`)
})