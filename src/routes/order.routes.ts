import { Router } from "express";
import controllers from "../handlers/controllers/order.controller";
import validators from "../handlers/validators/order.validator";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";
import checkAdminMiddleware from "../core/middlewares/check-admin.middleware";

const router = Router();

router.get("/", checkAuthMiddleware, controllers.getOrders);

router.get(
  "/:orderId",
  validators.validateGetUserById(),
  checkAuthMiddleware,
  controllers.getOrderById
);

router.post("/create", checkAuthMiddleware, controllers.createOrder);

router.put(
  "/update/:orderId",
  validators.validateUpdateOrderStatus(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.updateOrderStatus
);

export default router;
