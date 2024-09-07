import { body } from "express-validator";

const validateCreateProduct = () => {
  return [
    body("productname")
      .trim()
      .notEmpty()
      .withMessage("Product name is required"),
    body("price")
      .trim()
      .notEmpty()
      .isNumeric()
      .isFloat({ gt: 0 })
      .withMessage("Invalid price"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("quantity")
      .trim()
      .notEmpty()
      .isNumeric()
      .isInt({ min: 0 })
      .withMessage("Invalid quantity"),
  ];
};

export default { validateCreateProduct };
