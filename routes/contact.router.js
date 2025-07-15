import express from "express";
import contactForm from "../controllers/contact.controller.js";

const contactRouter = express.Router()
contactRouter.post("/", contactForm )

export default contactRouter