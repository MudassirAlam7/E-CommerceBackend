import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,

      required: true,
    },

    subcategory: [
      {
        type: String,

        required: true,
      },
    ],

    image: {
      type: String,

      required: true,
    },

    description: {
      type: String,
    },
    stock: {
      type: Number,

      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSchema);

export default Product;
