import { Router } from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createproduct").post(
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "productImages", maxCount: 5 },
  ]),
  addProduct
);
router.route("/getallproducts").get(getAllProducts);

export default router;
