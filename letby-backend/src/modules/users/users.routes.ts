import { Router } from "express";
import { getUser } from "./users.controller.js";

const router = Router();

router.get("/:id", getUser);

export default router;
