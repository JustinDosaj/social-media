import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { ProfileControllers } from "../controllers/profiles.controllers";

const router = Router()

router.get('/:username', verifyToken, ProfileControllers.getProfileByUsername)

export default router