import express from "express"
import User from "../models/user.models.js"
import bcrypt from "bcrypt"
const AuthRouter = express.Router()


AuthRouter.post("/register", async (req, res)=>{
    try{
        const {name, email, password} = req.body

        const exisitngUser = await User.findOne({email});
        if(exisitngUser){
            return res.status(400).json({message: "User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({name, email, password : hashedPassword})
        await newUser.save()

        res.status(201).json({message : "user successfully registered"})
    }
    catch(err){
        res.status(401).json({message : "server error", error : err.message})

    }
})




export default AuthRouter