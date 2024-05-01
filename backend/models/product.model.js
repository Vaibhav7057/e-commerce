import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  category: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: String,
    default: 1,
  },
  brand: {
    type: String,
  },
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  images: [],
});

export const Product = mongoose.model("Product", productSchema);
