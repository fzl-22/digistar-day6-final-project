const validator = require("express-validator");

const validateGetUserById = () => {
  return [
    validator.param("userId").trim().notEmpty().withMessage("User ID is required"),
  ];
};

const validateCreateUser = () => {
  return [
    validator.body("name").trim().notEmpty().withMessage("Name is required"),
    validator.body("email").trim().isEmail().withMessage("Invalid email"),
  ];
};

const validateUpdateUser = () => {
  return [
    validator.param("userId").trim().notEmpty().withMessage("Invalid user ID"),
    validator.body("name").optional().trim(),
    validator.body("email").optional().trim().isEmail(),
  ];
};

const validateDeleteUser = () => {
  return [
    validator
      .param("userId")
      .trim()
      .notEmpty()
      .withMessage("User ID is required"),
  ];
};

module.exports = {
  validateGetUserById,
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
};
