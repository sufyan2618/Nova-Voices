import express from 'express';
import env from 'dotenv';
const app = express();
import connectDb from './utils/connectDb.js';

env.config();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello World");
})


const port = process.env.PORT || 3000;
app.listen(port,() =>{
    connectDb();
    console.log(`Server is running on http://localhost:${port}`);
})