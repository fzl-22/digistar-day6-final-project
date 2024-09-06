import { Router } from "express";
import validators from "../handlers/validators/auth.validator";
import controllers from "../handlers/controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  validators.validateRegisterUser(),
  controllers.registerUser
);

router.post("/login", validators.validateLoginUser(), controllers.loginUser);

export default router;
