import { Router } from "express";
import { AuthControllers } from "../controllers/auth";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post('/signup', AuthControllers.Registration.signUp);

router.post('/confirm', AuthControllers.Registration.confirmSignUp);

router.post('/login', AuthControllers.Session.login);

router.post('/logout', verifyToken, AuthControllers.Session.signOut);

router.get('/', verifyToken, AuthControllers.Session.getUser)

export default router;