import { Router } from "express";
import validators from "../handlers/validators/product.validator";
import controllers from "../handlers/controllers/product.controller";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";
import checkAdminMiddleware from "../core/middlewares/check-admin.middleware";

const router = Router();

router.get("/", controllers.getProducts);

router.post(
  "/create",
  validators.validateCreateProduct(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.createProduct
);

export default router;
