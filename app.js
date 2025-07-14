import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/database.js"
import AuthRouter from "./routes/Auth.router.js"

dotenv.config()


const app = express()
app.use(express.json())

app.use("/api/auth", AuthRouter)

connectDB()
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})