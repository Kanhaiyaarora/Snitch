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
