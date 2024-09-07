import { param, body } from "express-validator";

const validateGetUserById = () => {
  return [
    param("userId").trim().notEmpty().withMessage("Invalid user ID"),
  ]
}

const validateUpdateUser = () => {
  return [
    param("userId").trim().notEmpty().withMessage("Invalid user ID"),
    body("username").optional().trim(),
    body("firstName").optional().trim(),
    body("lastName").optional().trim(),
    body("email").optional().trim().isEmail(),
    body("address").optional().trim(),
  ];
};

const validateDeleteUser = () => {
  return [param("userId").trim().notEmpty().withMessage("Invalid user ID")];
};

export default {
  validateGetUserById,
  validateUpdateUser,
  validateDeleteUser,
};
