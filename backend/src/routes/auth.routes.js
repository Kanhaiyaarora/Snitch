import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validators.js";
import { googleAuthController, loginUserController, registerUserController } from "../controllers/auth.controllers.js";
import passport from 'passport';


const authRouter = Router();

// complete route /api/auth/register
authRouter.post("/register",validateRegisterUser,registerUserController);

// complete route /api/auth/login
authRouter.post("/login",validateLoginUser,loginUserController);

// complete route /api/auth/google
authRouter.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// complete route /api/auth/google/callback
authRouter.get("/google/callback", passport.authenticate('google',{session: false, failureRedirect: '/login'}),googleAuthController )

export default authRouter;