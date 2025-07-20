import express from "express"
import { allProduct, categoryProduct, addToProduct, deleteProduct} from "../controllers/product.controller.js"
import upload from "../middleware/multer.js"

const productRouter = express.Router()

productRouter.get("/", allProduct)
productRouter.get("/category", categoryProduct)
productRouter.post("/uploads", upload.array("files", 5), addToProduct )
productRouter.delete("/:productId", deleteProduct)
export default productRouter