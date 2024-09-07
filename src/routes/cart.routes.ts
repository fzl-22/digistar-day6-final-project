import express from "express";
import controllers from "../handlers/controllers/cart.controller";
import validators from "../handlers/validators/cart.validator";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";

const router = express.Router();

router.get("/", checkAuthMiddleware, controllers.getCart);

router.post(
  "/add",
  validators.validateAddProductToCart(),
  checkAuthMiddleware,
  controllers.addProductToCart
);

router.delete("/clear", checkAuthMiddleware, controllers.clearCart);

export default router;
