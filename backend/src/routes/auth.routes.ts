import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

const router = Router();

router.post('/signup', AuthController.signUp)

router.post('/confirm', AuthController.confirmSignUp)

router.post('/signin', AuthController.signIn)

export default router