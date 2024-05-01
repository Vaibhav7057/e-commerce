import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProduct = asyncHandler(async (req, res) => {
  const { productName, description, category, price, stock, brand, discount } =
    req.body;

  if (!productName || !category || !price || !stock)
    throw new ApiError(401, "every field is requied");

  const product = await Product.create({
    productName,
    description,
    category,
    price,
    stock,
    brand,
    discount,
  });

  if (!product) throw new ApiError(501, "internal server error");

  const thumbnail = req.files["thumbnail"][0];

  const productImages = req.files["productImages"];

  const image = await uploadOnCloudinary(thumbnail.path, "products");

  let thumbnailPhoto = {
    public_id: image?.public_id || "",
    url: image?.secure_url || "",
  };

  product.thumbnail = thumbnailPhoto;

  for (let image of productImages) {
    const result = await uploadOnCloudinary(image.path, "products");

    let photo = {
      public_id: result?.public_id || "",
      url: result?.secure_url || "",
    };
    product.images.push(photo);
  }

  await product.save();

  return res
    .status(201)
    .json(
      new ApiResponse(201, "product created successfully", "product", product)
    );
});

export { addProduct };
