import { Router } from "express";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/authController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

const authRouter = Router();

authRouter.post(
  "/register",
  registerUser
);

authRouter.post(
  "/login",
  loginUser
);

authRouter.get(
  "/me",
  authenticate,
  getCurrentUser
);

export default authRouter;