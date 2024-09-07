import { body, param } from "express-validator";

const validateGetUserById = () => {
  return [param("userId").trim().notEmpty().withMessage("Invalid user ID")];
};

const validateUpdateOrderStatus = () => {
  return [
    param("orderId").trim().notEmpty().withMessage("Invalid order ID"),
    body("status")
      .trim()
      .notEmpty()
      .isIn(["ready", "paid", "sent", "received", "completed"])
      .withMessage("Invalid status"),
  ];
};

export default { validateGetUserById, validateUpdateOrderStatus };
