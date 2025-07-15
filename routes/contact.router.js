import express from "express";
import contactForm from "../controllers/contact.controller.js";

const contactRouter = express.Router()
contactRouter.post("/contact", contactForm )

export default contactRouter