import { body } from "express-validator";

const validateAddProductToCart = () => {
  return [
    body("productId")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid Product ID format"),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be an integer greater than 0"),
  ];
};

export default { validateAddProductToCart };
