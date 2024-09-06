import { body } from "express-validator";

const validateRegister = () => {
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
  ];
};

export default { validateRegister };
