import { Router } from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { validateCreateProduct } from "../validators/product.validators.js";
import {
  createProduct,
  getAllProducts,
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

export default productRouter;
