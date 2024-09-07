import { body } from "express-validator";

const validateRegisterUser = () => {
  return [
    body("username").trim().notEmpty().withMessage("Name is required"),
    body("firstName")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("First name must have at least 3 characters"),
    body("lastName")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Last name must have at least 3 characters"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .notEmpty()
      .isAlphanumeric()
      .isLength({ min: 8, max: 16 })
      .withMessage("Invalid password"),
    body("address").trim().notEmpty().withMessage("Address is required"),
  ];
};

const validateLoginUser = () => {
  return [
    body("email").trim().notEmpty().isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Invalid password"),
  ];
};

export default { validateRegisterUser, validateLoginUser };
