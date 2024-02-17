import express from "express";
const app = express();
import dotenv from "dotenv";
//import productRoutes from "./routes/products.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

dotenv.config({ path: 'backend/config/config.env' });

// connectiong to database
connectDatabase();

app.use(express.json());

import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server listening on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});


// Handle Unhandled Promise rejections 
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.logg("Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});