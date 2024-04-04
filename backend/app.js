import express from "express";
const app = express();
import dotenv from "dotenv";
//import productRoutes from "./routes/products.js";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import OpenAI from "openai";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

dotenv.config({ path: 'backend/config/config.env' });

// connectiong to database
connectDatabase();

app.use(express.json( { 
    limit: "10mb",
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    },
 })); 
app.use(cookieParser());



//import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";

app.use('/', (req, _, next) => {
    console.log(`Received ${req.method} to ${req.originalUrl}`);
    next();
})

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Using error middleware
app.use(errorMiddleware);

const openai = new OpenAI({
    // replace your-api-key with your API key from ChatGPT
    apiKey: process.env.OPEN_AI_API_KEY
});

app.post('/api/v1/chat', async (req, res)=> {   
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": req.body.question}],
          });
      console.log(chatCompletion.choices[0].message);           
          
      res.status(200).json({message: chatCompletion.choices[0].message.content});
    } catch(e) {
        console.error(e.message)
        res.status(400).json({message: e.message});
    }
  });
  
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