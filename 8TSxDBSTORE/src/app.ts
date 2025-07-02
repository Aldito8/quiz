import express from 'express';
import productrouter from './routers/product';
import supplierrouter from './routers/supplier';

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/v1', productrouter)
app.use('/api/v1', supplierrouter)

app.use((err: any, req: any, res: any, next: any) => {
    const status = err.status || 500;
    const message = err.message || "Terjadi kesalahan internal server";

    res.status(status).json({
        status: status,
        message
    });
});

app.listen(PORT, () => {
    console.log(`server is running PORT ${PORT}`)
})