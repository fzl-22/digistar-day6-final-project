import { Router } from "express";

import controllers from "../handlers/controllers/user.controller";
import validators from "../handlers/validators/user.validator";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";

const router = Router();

router.get("/", checkAuthMiddleware, controllers.getUsers);

router.get("/search", checkAuthMiddleware, controllers.searchUsers);

router.get("/:userId", checkAuthMiddleware, controllers.getUserById);

router.put(
  "/:userId",
  validators.validateUpdateUser(),
  checkAuthMiddleware,
  controllers.updateUser
);

router.delete("/:userId", checkAuthMiddleware, controllers.deleteUser);

export default router;
