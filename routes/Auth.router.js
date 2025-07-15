import express from "express"
const AuthRouter = express.Router()
import { signUp, logIn} from "../controllers/user.controller.js"
AuthRouter.post("/register", signUp)
AuthRouter.post("/logIn", logIn)
 




export default AuthRouter