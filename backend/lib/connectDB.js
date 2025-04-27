import mongoose from "mongoose";
import dotenv from "dotenv"

export const  connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB CONNETD")
    } catch (error) {
        console.log("error while connect mongodb",error)
    }
}