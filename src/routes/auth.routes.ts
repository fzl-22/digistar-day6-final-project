import { Router } from "express";
import validators from "../handlers/validators/auth.validator";
import controllers from "../handlers/controllers/auth.controller";

const router = Router();

router.post("/register", validators.validateRegister(), controllers.register);

export default router;