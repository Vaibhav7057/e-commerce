import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProduct = asyncHandler(async (req, res) => {
  const { productName, description, category, price } = req.body;

  if (!productName || !category || !price)
    throw new ApiError(401, "every field is requied");

  const product = await Product.create({
    productName,
    description,
    category,
    price,
  });

  if (!product) throw new ApiError(501, "internal server error");

  const images = req.files;

  let uploads = [];

  for (let image of images) {
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "auto",
      folder: "products",
    });

    let photo = {
      public_id: result?.public_id || "",
      url: result?.secure_url || "",
    };
    uploads.push(photo);
  }

  product.images = uploads;

  await product.save();

  return res
    .status(201)
    .json(
      new ApiResponse(201, "product created successfully", "product", product)
    );
});

export { addProduct };
