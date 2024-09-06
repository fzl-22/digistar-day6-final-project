import { Router } from "express";

import controllers from "../handlers/controllers/role.controller";
import validators from "../handlers/validators/role.validator";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";

const router = Router();

router.get("/", checkAuthMiddleware, controllers.getRoles);

router.post(
  "/",
  validators.validateCreateRole(),
  checkAuthMiddleware,
  controllers.createRole
);

router.put(
  "/:roleId",
  validators.validateUpdateRole(),
  checkAuthMiddleware,
  controllers.updateRole
);

router.delete(
  "/:roleId",
  validators.validateDeleteRole(),
  checkAuthMiddleware,
  controllers.deleteRole
);

router.put(
  "/assign/:userId",
  validators.validateAssignRole(),
  checkAuthMiddleware,
  controllers.assignRole
);

router.put(
  "/revoke/:userId",
  validators.validateRevokeRole(),
  checkAuthMiddleware,
  controllers.revokeRole
);

export default router;
