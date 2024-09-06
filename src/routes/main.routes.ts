import { Router } from "express";
import userControllers from "../handlers/controllers/user.controller";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";

const router = Router();

router.get("/", checkAuthMiddleware, userControllers.getUsers);

export default router;
