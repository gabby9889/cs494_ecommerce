import express from "express";
const app = express();
import dotenv from "dotenv";
//import productRoutes from "./routes/products.js";
import { connectDatabase } from "./config/dbConnect.js";


dotenv.config({ path: 'backend/config/config.env' });

// connectiong to database
connectDatabase();

//import all routes
app.use(express.json());

import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

app.listen(process.env.PORT, () => {
    console.log(
        `Server listening on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});

