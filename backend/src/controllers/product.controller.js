import productModel from "../models/product.model.js";
import { uploadImage } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  const { title, description, currency, amount } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadImage({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  try {
    const product = await productModel.create({
      title,
      description,
      price: { currency: currency ?? "INR", amount: amount ?? 0 },
      seller: seller._id,
      images,
    });

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating product", success: false, error });
  }
};

export const getSellerProducts = async (req, res) => {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });

  res.status(200).json({
    message: "Products fetched successfully by seller.",
    success: true,
    products,
  });
};

export const getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    message: "Products fetched successfully.",
    success: true,
    products,
  });
};

export const getProductDetails = async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "Product details fetched successfully.",
    success: true,
    product,
  });
};

export const addProductVariants = async (req, res) => {
  const { productId } = req.params;
  const product = await productModel.findOne({
    _id: productId,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  const files = req.files;
  const images = [];

  if (files && files.length > 0) {
    await Promise.all(
      files.map(async (file) => {
        const image = await uploadImage({
          buffer: file.buffer,
          fileName: file.originalname,
        });
        return images.push(image);
      }),
    );
  }

  const price = req.body.amount;
  const stock = req.body.stock;
  const attributes = JSON.parse(req.body.attributes || "{}");

  product.variants.push({
    price: {
      currency: req.body.currency ?? product.price.currency,
      amount: price ?? product.price.amount,
    },
    stock: stock ?? 0,
    attributes,
    images,
  });
};
