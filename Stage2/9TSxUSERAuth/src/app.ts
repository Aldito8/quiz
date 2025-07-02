import express from "express";
import authRouter from "./routers/auth";
import resetPasswordRouter from "./routers/reset-password";
import productRouter from "./routers/product";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/auth", resetPasswordRouter);
app.use("/products", productRouter)

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});