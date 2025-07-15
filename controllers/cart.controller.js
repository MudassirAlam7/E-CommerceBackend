import Cart from "../models/cart.models.js";
import { customResponse } from "../utils/customresponse.js";

const getCart = async (req, res)=>{
   try {
    let {userId} = req.params
    const cart = await Cart.find({userId}).populate("products.productid")
    return customResponse(res, 400, "fetched cart successfully", null, false)





   } catch (error) {
    return customResponse(res, 500, "sever error", `error, ${error}`, false)
   }
} 

const addToCart = async(req, res)=>{
    try{
    let {userId} = req.params
    let {productid, quantity} = req.body

    const cart = await Cart.find({userId})

    if(!cart){
        cart = new Cart({userId, products:[{productid, quantity}]})
    }
    else{
        const existingProduct = await cart.find.products(item=>item.productid===productid)
        if(existingProduct){
            existingProduct.quantity += quantity
        }
        else{
            cart.products.push({productid, quantity})
        }
    }

    await cart.save()
  }
  catch(error){
    return customResponse(res, 500, "server error", `error ${error}`, false)
  }
}


export{getCart, addToCart}