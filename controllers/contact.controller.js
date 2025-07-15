import Contact from "../models/contact.model.js"
import { customResponse } from "../utils/customresponse.js"

const contactForm = async (req, res)=>{
   try {
     const{name, email, message} = req.body

    if(!name.trim() || !email.trim() || !message.trim()){
        return customResponse(res, 400, "All field are required", null, false)
    }

    const query = await Contact.create({name, email, message})
    return customResponse(res, 200, "your message has been received", null, true, query)
   } catch (error) {
    return customResponse(res, 500, "server error", `error ${error}`, false)
   }
}

export default contactForm