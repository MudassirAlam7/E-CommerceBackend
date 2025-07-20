import Product from "../models/product.models.js";
import { customResponse } from "../utils/customresponse.js";

const addToProduct = async (req, res) => {
  try {
    const { productName, price, category, subcategory, description, stock } = req.body;

    // Validate input fields
    if (
      !productName?.trim() || 
      !price || 
      !category?.trim() || 
      !subcategory?.trim() || 
      !description?.trim() || 
      !stock
    ) {
      return customResponse(res, 400, "Please enter all the fields", "missing Input", false);
    }

    // Validate uploaded files
    if (!req.files || req.files.length === 0) {
      return customResponse(res, 400, "At least one image is required", "files missing", false);
    }

    // Extract image URLs from Cloudinary (req.files)
    const imageUrls = req.files.map(file => file.path);

    // Save product with multiple image URLs
    const newProduct = await Product.create({
      productName,
      price,
      category,
      subcategory,
      image: imageUrls, // make sure this matches your schema
      description,
      stock,
    });

    return customResponse(
      res,
      201,
      "Product added successfully",
      null,
      true,
      newProduct
    );
  } catch (error) {
    return customResponse(res, 500, "Server error", error.message, false);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return customResponse(
        res,
        400,
        "product not found",
        "error",
        false,
        null
      );
    }
    return customResponse(res, 200, "product deleted successfully", null, true , deleteProduct)
  } catch (error) {
    return customResponse(res, 500, "server error", error.message, false, null)
  }
};
const allProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return customResponse(
      res,
      200,
      "fetched all the product",
      null,
      true,
      products
    );
  } catch (error) {
    return customResponse(res, 500, "server error", error.message, false);
  }
};

const categoryProduct = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (!products.length) {
      return customResponse(
        res,
        400,
        "No product is found",
        "list is empty",
        false
      );
    }
    return customResponse(
      res,
      200,
      `fetched product for the ${category}`,
      null,
      true,
      products
    );
  } catch (error) {
    return customResponse(res, 500, "server error", null, false, null);
  }
};
export { addToProduct, allProduct, categoryProduct, deleteProduct };
