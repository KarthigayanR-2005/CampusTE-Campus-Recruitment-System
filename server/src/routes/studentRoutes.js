import { Router } from "express";

import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentController.js";

import {
  addStudentSkill,
  editStudentSkill,
  getStudentSkills,
  removeStudentSkill,
} from "../controllers/studentSkillController.js";

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

// Student profile
studentRouter.get(
  "/profile",
  getStudentProfile
);

studentRouter.put(
  "/profile",
  updateStudentProfile
);

// Student skills
studentRouter.get(
  "/skills",
  getStudentSkills
);

studentRouter.post(
  "/skills",
  addStudentSkill
);

studentRouter.put(
  "/skills/:skillId",
  editStudentSkill
);

studentRouter.delete(
  "/skills/:skillId",
  removeStudentSkill
);

export default studentRouter;