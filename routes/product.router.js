import express from "express"
import { allProduct, categoryProduct} from "../controllers/product.controller.js"

const productRouter = express.Router()

productRouter.get("/", allProduct)
productRouter.get("/category", categoryProduct)
export default productRouter