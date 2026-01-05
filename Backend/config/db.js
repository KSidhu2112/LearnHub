import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectDB=async()=>{
    const conn=await mongoose.connect(process.env.MONG_URI);
    console.log("MongoDB Connected Successfully!")
}

dotenv.config();

export default connectDB;