import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

async function generateAuthToken(user, res, message) {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    CONFIG.JWT_SECRET,
    {
      expiresIn: CONFIG.JWT_EXPIRE,
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    message,
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      contact: user.contact,
      role: user.role,
    },
    token,
  });
}

export default generateAuthToken;
