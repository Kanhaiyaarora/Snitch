import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

async function generateAuthToken(user) {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.JWT_EXPIRE,
  });
}

export default generateAuthToken;