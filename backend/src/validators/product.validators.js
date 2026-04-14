import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }
  next();
};

export const validateCreateProduct = [
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("currency")
    .notEmpty()
    .withMessage("currency is required")
    .isIn(["USD", "EUR", "GBP", "JPY", "INR"])
    .withMessage("Invalid currency"),
  body("amount").isNumeric().withMessage("Product amount must be a number"),
  validateRequest,
];
