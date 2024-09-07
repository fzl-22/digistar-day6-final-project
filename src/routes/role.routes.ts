import { Router } from "express";

import controllers from "../handlers/controllers/role.controller";
import validators from "../handlers/validators/role.validator";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";
import checkAdminMiddleware from "../core/middlewares/check-admin.middleware";

const router = Router();

router.get("/", checkAuthMiddleware, controllers.getRoles);

router.post(
  "/create",
  validators.validateCreateRole(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.createRole
);

router.put(
  "/update/:roleId",
  validators.validateUpdateRole(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.updateRole
);

router.delete(
  "/delete/:roleId",
  validators.validateDeleteRole(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.deleteRole
);

router.put(
  "/assign/:userId",
  validators.validateAssignRole(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.assignRole
);

router.put(
  "/revoke/:userId",
  validators.validateRevokeRole(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.revokeRole
);

export default router;
