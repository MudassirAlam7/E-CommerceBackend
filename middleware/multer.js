import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : 'myUploads',
        allowed_formats : ["jpg", "png", "jpeg", "webp"],
        transformations : [{width : 500, height : 500}]
    }
});

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        if(file.mimetype.startsWith("image/")){
            cb(null, true)
        }
        else{
            cb(new Error("only image is allowed"), false);
        }
    }
})
export default upload