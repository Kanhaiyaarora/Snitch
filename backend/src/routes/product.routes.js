import { Router } from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { validateCreateProduct } from "../validators/product.validators.js";
import {
  addProductVariants,
  createProduct,
  getAllProducts,
  getProductDetails,
  getSellerProducts,
} from "../controllers/product.controller.js";

const productRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
}); // 10 MB file size limit

// complete route /api/products

productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  validateCreateProduct,
  createProduct,
);

// get all products listed by seller
productRouter.get("/seller", authenticateSeller, getSellerProducts);

// get all products for customers
productRouter.get("/", getAllProducts);

// get specific product details for customers
productRouter.get("/detail/:productId", getProductDetails);

// add variants to existing product
productRouter.post(
  "/:productId/variants",
  authenticateSeller,
  upload.array("images", 7),
  addProductVariants,
);

export default productRouter;
