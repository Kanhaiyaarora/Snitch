import userModel from "../models/user.model.js";
import generateAuthToken from "../utils/generateAuthToken.js";

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
    console.log("Step 1: Finding user");
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log("Step 2: User found", user);
    console.log("Step 3: Comparing password");
    const isPasswordMatched = await user.comparePassword(password);
    console.log("Step 4: Password comparison result", isPasswordMatched);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log("Step 5: Password matched, generating token");
    await generateAuthToken(user, res, "user logged in successfully");
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};
