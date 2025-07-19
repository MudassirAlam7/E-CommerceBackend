import express from "express"
import { allProduct, categoryProduct, addToProduct, deleteProduct} from "../controllers/product.controller.js"
import upload from "../middleware/multer.js"

const productRouter = express.Router()

productRouter.get("/", allProduct)
productRouter.get("/category", categoryProduct)
productRouter.post("/uploads", upload.single("image"), addToProduct )
productRouter.delete("/:productId", deleteProduct)
export default productRouter