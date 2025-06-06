import express from 'express';
import env from 'dotenv';
import connectDb from './utils/connectDb.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/", (req, res) =>{
    res.send("Hello World");
})

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,

}))


const port = process.env.PORT || 3000;
app.listen(port,() =>{
    connectDb();
    console.log(`Server is running on http://localhost:${port}`);
})