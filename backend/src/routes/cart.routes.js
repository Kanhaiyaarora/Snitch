import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

/* 
@route POST /api/cart/add/:productId/:variantId
description: Add a product to the cart
access: Private (only authenticated users)
@arguments:
- productId: ID of the product to add to the cart (required)
- variantId: ID of the product variant to add to the cart (optional, if the product has variants)
- quantity: Number of items to add to the cart (optional, default is 1)
*/

cartRouter.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCart,
);

/* 
@route GET /api/cart
description: Get the current user's cart
access: Private (only authenticated users)
*/

cartRouter.get("/", authenticateUser, getCart);

export default cartRouter;
