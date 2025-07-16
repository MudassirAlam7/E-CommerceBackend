import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config()

const cloudinaryConnection = async()=>{
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_SECRET_KEY
        })

        const res = await cloudinary.api.ping();
        console.log("cloudinary connected", res);
        
    } catch (error) {
        console.error("cloudinary connection failed", error.message);
    }
}
export default cloudinaryConnection