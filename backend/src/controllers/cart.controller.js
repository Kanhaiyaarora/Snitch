import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;
  const userId = req.user._id;

  try {
    // Fetch the product and variant details
    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const variant = product.variants.find(
      (variant) => variant._id.toString() === variantId,
    );
    if (!variant) {
      return res.status(404).json({ message: "Product variant not found" });
    }

    // Check the stock of the variant
    const stock = await stockOfVariant(productId, variantId);

    // Calculate the price based on the variant
    const price = variant.price;

    // Find or create the user's cart
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }
    // Check if the product variant is already in the cart
    const isProductAlreadyInCart = cart.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    if (isProductAlreadyInCart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant?.toString() === variantId,
      ).quantity;

      if (quantityInCart + quantity > stock) {
        return res.status(400).json({
          message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
          success: false,
        });
      }

      // If the product variant is already in the cart, update the quantity
      await cartModel.findOneAndUpdate(
        {
          user: req.user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        { $inc: { "items.$.quantity": quantity } },
        { new: true },
      );

      return res.status(200).json({
        message: "Cart updated successfully",
        success: true,
      });
    }

    // check stock of the variant
    if (quantity > stock) {
      return res
        .status(400)
        .json({
          message:
            "Insufficient stock for the requested quantity. We only have " +
            stock +
            " items left.",
        });
    }
    // If the product variant is not in the cart, add it as a new item
    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
      price,
    });

    await cart.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product")
      .populate("items.variant");
    if (!cart) {
      cart = await cartModel.create({ user: userId, items: [] });
    }

    res
      .status(200)
      .json({ message: "Cart fetched successfully", success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};
