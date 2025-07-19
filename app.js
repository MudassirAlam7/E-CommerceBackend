
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/database.js"
import AuthRouter from "./routes/Auth.router.js"
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import contactRouter from "./routes/contact.router.js"
import protect from "./middleware/auth.middleware.js"
import cors from "cors"
import cloudinaryConnection from "./db/cloudinary.js"
cloudinaryConnection()

dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
  origin: "*", // or specify frontend URL like "https://your-frontend.vercel.app"
  credentials: true
}));

app.use("/api/auth", AuthRouter)
app.use("/api/products", productRouter )
app.use("/api/cart", cartRouter)
app.use("/api/contact", contactRouter)

app.get("/", (req, res)=>{
    console.log("root route hit")
    res.send("Hello world")
})
connectDB()
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})
