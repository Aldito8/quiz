import express from 'express'
import router from './routers/book-router'

const app = express()
const PORT = 3000

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server is running PORT : ${PORT}`)
})
