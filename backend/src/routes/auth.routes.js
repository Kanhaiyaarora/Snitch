import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validators.js";
import { loginUserController, registerUserController } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/register",validateRegisterUser,registerUserController);

authRouter.post("/login",validateLoginUser,loginUserController);

export default authRouter;