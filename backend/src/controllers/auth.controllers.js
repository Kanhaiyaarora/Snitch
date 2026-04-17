import userModel from "../models/user.model.js";
import generateAuthToken from "../utils/generateAuthToken.js";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

export const registerUserController = async (req, res, next) => {
  const { email, fullname, contact, password, isSeller } = req.body;

  if (!email || !fullname || !contact || !password || !isSeller) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isUserExist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exist with this email or contact" });
    }

    const user = await userModel.create({
      email,
      fullname,
      contact,
      password,
      role: isSeller ? "seller" : "buyer",
    });

    await generateAuthToken(user, res, "user registered successfully");
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    await generateAuthToken(user, res, "user logged in successfully");
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};

export const googleAuthController = async (req, res, next) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;
  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        fullname: displayName,
        googleId: id,
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      CONFIG.JWT_SECRET,
      {
        expiresIn: CONFIG.JWT_EXPIRE,
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("http://localhost:5173/");
  } catch (error) {
    console.log("google auth error", error);
    res.redirect("http://localhost:5173/login");
  }
};

export const logoutUserController = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out successfully" });
};
