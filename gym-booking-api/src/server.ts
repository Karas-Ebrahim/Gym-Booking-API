import  express, {Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express()
app.use(express.json())

const startServer = async ()=>{
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))
}


startServer()

module.exports = app;
