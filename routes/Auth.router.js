import express from "express"
const AuthRouter = express.Router()
import { signUp, logIn, logOut} from "../controllers/user.controller.js"
AuthRouter.post("/register", signUp)
AuthRouter.post("/logIn", logIn)
AuthRouter.post('/logout', logOut)
 




export default AuthRouter