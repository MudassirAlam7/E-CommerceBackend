import express from "express"
import { allProduct, categoryProduct, addToProduct} from "../controllers/product.controller.js"
import upload from "../middleware/multer.js"

const productRouter = express.Router()

productRouter.get("/", allProduct)
productRouter.get("/category", categoryProduct)
productRouter.post("/uploads", upload.single("image"), addToProduct )
export default productRouter