import { Router } from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { validateCreateProduct } from "../validators/product.validators.js";
import {
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

productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  validateCreateProduct,
  createProduct,
);

productRouter.get("/seller", authenticateSeller, getSellerProducts);

productRouter.get("/", getAllProducts);

// complete route /api/products/detail/:productId
productRouter.get("/detail/:productId", getProductDetails)

export default productRouter;
