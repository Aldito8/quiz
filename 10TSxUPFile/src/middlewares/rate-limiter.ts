import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: "Terlalu banyak request, coba lagi nanti.",
});

export default limiter