import mongoose from "mongoose";
import { getCart, addToCart } from "../controllers/cart.controller.js";
import express from "express"

const cartRouter = express.Router()

cartRouter.get("/:userId", getCart)
cartRouter.post("/:userId", addToCart)

export default cartRouter