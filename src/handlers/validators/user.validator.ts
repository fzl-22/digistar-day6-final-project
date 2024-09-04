import { param, body } from "express-validator";

const validateGetUserById = () => {
  return [
    param("userId").trim().notEmpty().withMessage("User ID is required"),
  ];
};

const validateCreateUser = () => {
  return [
    body("username").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email"),
  ];
};

const validateUpdateUser = () => {
  return [
    param("userId").trim().notEmpty().withMessage("Invalid user ID"),
    body("username").optional().trim(),
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
