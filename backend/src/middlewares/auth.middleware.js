import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";
import userModel from "../models/user.model.js";

const authenticateSeller = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "unauthorised - token not found",
      });
    }

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

    const { id } = decoded;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "unauthorised",
      });
    }

    if (user.role !== "seller") {
      return res.status(403).json({
        message: "Forbidden - only sellers can perform this action",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default authenticateSeller;
