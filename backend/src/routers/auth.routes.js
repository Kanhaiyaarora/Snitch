import { Router } from "express";
import { validateRegisterUser } from "../validators/auth.validators.js";

const authRouter = Router();

authRouter.post("/register",validateRegisterUser);

export default authRouter;
