import { param, body } from "express-validator";

const validateGetUserById = () => {
  return [
    param("userId").trim().notEmpty().withMessage("User ID is required"),
  ];
};

const validateCreateUser = () => {
  return [
    body("username").trim().notEmpty().withMessage("Name is required"),
    body("firstName").trim().notEmpty().isLength({min: 3}).withMessage("First name must have at least 3 characters"),
    body("lastName").trim().notEmpty().isLength({min: 3}).withMessage("Last name must have at least 3 characters"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().isAlphanumeric().isLength({min: 8, max: 16}).withMessage("Invalid password"),
  ];
};

const validateUpdateUser = () => {
  return [
    param("userId").trim().notEmpty().withMessage("Invalid user ID"),
    body("username").optional().trim(),
    body("firstName").optional().trim(),
    body("lastName").optional().trim(),
    body("email").optional().trim().isEmail(),
  ];
};

const validateDeleteUser = () => {
  return [
    param("userId")
      .trim()
      .notEmpty()
      .withMessage("User ID is required"),
  ];
};

export default {
  validateGetUserById,
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
};
