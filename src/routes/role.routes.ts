import { Router } from "express";

import controllers from "../handlers/controllers/role.controller";
import validators from "../handlers/validators/role.validator";

const router = Router();

router.get("/", controllers.getRoles);

router.post("/", validators.validateCreateRole(), controllers.createRole);

router.put(
  "/:roleId",
  validators.validateUpdateRole(),
  controllers.updateRole
);

router.delete(
  "/:roleId",
  validators.validateDeleteRole(),
  controllers.deleteRole
);

export default router;
