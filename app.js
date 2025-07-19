import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

import connectDB from "./db/database.js";
import cloudinaryConnection from "./db/cloudinary.js";

// Load environment variables
dotenv.config();

// Initialize DB and cloudinary connections
connectDB();
cloudinaryConnection();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
import AuthRouter from "./routes/Auth.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import contactRouter from "./routes/contact.router.js";

app.use("/api/auth", AuthRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("Hello world from Vercel Serverless!");
});

// ❌ Remove app.listen()
// ✅ Export as serverless function
export const handler = serverless(app);
