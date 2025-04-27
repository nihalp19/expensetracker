import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./lib/connectDB.js"
import expenseRoutes from "./route/expense.route.js"

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use("/api/expense",expenseRoutes)

app.all("/",async (req,res) => {
    res.send("BACKEND IS RUNNING")
})


app.listen(PORT, () => {
    connectDB()
    console.log(`SERVER STARTED AT PORT NO ${PORT}`)
})

