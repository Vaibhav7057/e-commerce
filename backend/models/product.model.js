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
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
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
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});

export const Product = mongoose.model("Product", productSchema);
