import userModel from "../models/user.model";
import generateAuthToken from "../utils/generateAuthToken";

export const registerUserController = async (req, res, next) => {
  if (!email || !fullname || !contact || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const { email, fullname, contact, password, role } = req.body;

  try {
    const isUserExist = await userModel.findOne($or([{ email }, { contact }]));
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exist with this email or contact" });
    }

    const User = await userModel.create({
      email,
      fullname,
      contact,
      password,
      role,
    });
    const token = await generateAuthToken(User);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: User, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
