import Product from "../models/product.models.js";
import { customResponse } from "../utils/customresponse.js";

const addToProduct = async (req, res)=>{
    try {
        const {productName, price,category, subcategory,description, stock} = req.body

        if(!req.file){
            return customResponse(res, 400, "image is required", "file missing", false)
        }
        const imageUrl = req.file.path;
        const newProduct = await Product.create({
            productName,
            price, 
            category,
            subcategory, 
            image : imageUrl,
            description, 
            stock
        })
        return customResponse(res, 201, "product added successfully", null, true, newProduct)
    } catch (error) {
        return customResponse(res, 500, "server error", error.message, false)
    }

}

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
export { addToProduct, allProduct, categoryProduct}