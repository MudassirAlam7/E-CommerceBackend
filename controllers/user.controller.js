    import User from "../models/user.models.js";
    import bcrypt from "bcrypt"
    import { customResponse } from "../utils/customresponse.js";
    import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../utils/pattern.js";
    import generateToken from "../utils/generateToken.js";
    const signUp = async (req, res)=>{
        try{
            const{name, email, password} = req.body;
            if(!name.trim() || !email.trim()|| !password.trim()){
                return customResponse(res, 400, "Please enter all the field", "missing Input", false)
            }
            if(!EMAIL_PATTERN.test(email)){
                return customResponse(res, 400, "enter valid email", "email not valid", false)
            }
            if(!PASSWORD_PATTERN.test(password)){
                return customResponse(res, 400, "password must contain alphanumeric character", "password is not in valid form", false)
            }

            const existingUser = await User.findOne({email})

            if(existingUser){
                return customResponse(res, 400, "User already exist", "enter a email", false)
            }
            
            const hashedPassword = await bcrypt.hash(password, 12)
            
            const user = await User.create({name, email, password : hashedPassword})  
            const token = generateToken(user._id)

            return customResponse(res, 201, "user created successfully",null, true, {
                id : user._id,
                name : user.name,
                email : user.email,
                token : token
            })



        }
        catch(err){
            return customResponse(res, 500, "server error", false)
        }
    }


    //login api

    const logIn = async (req, res)=>{
        try {
            const{email, password} = req.body

            if(!email.trim()|| !password.trim()){
                return customResponse(res, 400, "All field are required", null, false, )
            }

            const user = await User.findOne({email})
            if(!user){
                return customResponse(res, 400, "This email do not exist", "enter a valid email", false)
            }
            const checkPassword = await bcrypt.compare(password, user.password)

            if(!checkPassword){
                return customResponse(res, 400, "Enter a valid password", null, false)
            }
            const token = generateToken(user._id)

            return customResponse(res, 200, "user login successfully", null, true, {
                id : user._id,
                email : user.email,
                name : user.name,
                token : token
            })


        } catch (error) {
            return customResponse(res, 500, "server error", false)
        }
    }

    const logOut = (req, res)=>{
        return customResponse(res, 200, "user logout successfully", null, true)
    }

    export {signUp, logIn, logOut}