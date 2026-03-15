import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';

import authRouter from './src/routes/authRoutes.js';

console.log("URL:", process.env.SUPABASE_URL);
let app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/api/auth",authRouter);


app.listen(4000,()=>{
    console.log("App is listening on port 4000");
})