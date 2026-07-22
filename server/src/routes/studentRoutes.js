import { Router } from "express";

import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

import {
  authorizeRoles,
} from "../middleware/authorizeRoles.js";

const studentRouter = Router();

studentRouter.use(
  authenticate,
  authorizeRoles("student")
);

studentRouter.get(
  "/profile",
  getStudentProfile
);

studentRouter.put(
  "/profile",
  updateStudentProfile
);

export default studentRouter;