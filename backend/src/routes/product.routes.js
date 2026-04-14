import { Router } from "express";
import multer from "multer";
import authenticateSeller from "../middlewares/auth.middleware.js";
import { validateCreateProduct } from "../validators/product.validators.js";
import { createProduct } from "../controllers/product.controller.js";

const productRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}); // 5MB file size limit

productRouter.post(
  "/",
  authenticateSeller,
  validateCreateProduct,
  upload.array("images", 7),
  createProduct,
);

export default productRouter;
