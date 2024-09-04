import { Router } from "express";
import userControllers from "../handlers/controllers/user.controller";

const router = Router();

router.get("/", userControllers.getUsers);

export default router;
