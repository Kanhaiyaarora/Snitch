import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


export const validateRegisterUser = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("fullname")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),
  body("contact").isMobilePhone().withMessage("Invalid contact number"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .isIn(["buyer", "seller"])
    .withMessage("Role must be either buyer or seller"),
  validateRequest,
];




