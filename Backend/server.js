import express from 'express';
import env from 'dotenv';
import connectDb from './utils/connectDb.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
const app = express();
env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}))

app.use("/api/auth", authRouter);

app.get("/", (req, res) =>{
    res.send("Hello World");
})


const __dirname = path.resolve();
if( process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}

const port = process.env.PORT || 3000;
app.listen(port,() =>{
    connectDb();
    console.log(`Server is running on http://localhost:${port}`);
})