import Product from "../models/product.models.js";
import { customResponse } from "../utils/customresponse.js";

const allProduct = async (req, res)=>{
    try{
    const products = await Product.find()
    return customResponse(res, 200, "fetched all the product", null, true, products)
    }
    catch(error){
        return customResponse(res, 500, "server error", error.message, false)
    }
}


const categoryProduct = async (req, res)=>{
    try {
        const {category} = req.params
        const products = await Product.find({category})
        if(!products.length){
            return customResponse(res, 400, "No product is found", "list is empty", false)
        }
        return customResponse(res, 200, `fetched product for the ${category}`, null, true, products)
    } catch (error) {
        return customResponse(res, 500, "server error", null, false, null)
    }
}
export {allProduct, categoryProduct}