import { Router } from "express";

import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentController.js";

import {
  getStudentProfileCompletion,
} from "../controllers/studentProfileCompletionController.js";

import {
  addStudentSkill,
  editStudentSkill,
  getStudentSkills,
  removeStudentSkill,
} from "../controllers/studentSkillController.js";

import {
  addStudentProject,
  editStudentProject,
  getStudentProjects,
  removeStudentProject,
} from "../controllers/studentProjectController.js";

import {
  addStudentCertification,
  editStudentCertification,
  getStudentCertifications,
  removeStudentCertification,
} from "../controllers/studentCertificationController.js";

import {
  addStudentExperience,
  editStudentExperience,
  getStudentExperiences,
  removeStudentExperience,
} from "../controllers/studentExperienceController.js";

import {
  deleteStudentResume,
  getStudentResume,
  getStudentResumeFile,
  uploadStudentResume,
} from "../controllers/studentResumeController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

import {
  authorizeRoles,
} from "../middleware/authorizeRoles.js";

import {
  uploadSingleResume,
} from "../middleware/resumeUpload.js";

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

studentRouter.get(
  "/profile-completion",
  getStudentProfileCompletion
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

// Student projects

studentRouter.get(
  "/projects",
  getStudentProjects
);

studentRouter.post(
  "/projects",
  addStudentProject
);

studentRouter.put(
  "/projects/:projectId",
  editStudentProject
);

studentRouter.delete(
  "/projects/:projectId",
  removeStudentProject
);

// Student certifications

studentRouter.get(
  "/certifications",
  getStudentCertifications
);

studentRouter.post(
  "/certifications",
  addStudentCertification
);

studentRouter.put(
  "/certifications/:certificationId",
  editStudentCertification
);

studentRouter.delete(
  "/certifications/:certificationId",
  removeStudentCertification
);

// Student experiences

studentRouter.get(
  "/experiences",
  getStudentExperiences
);

studentRouter.post(
  "/experiences",
  addStudentExperience
);

studentRouter.put(
  "/experiences/:experienceId",
  editStudentExperience
);

studentRouter.delete(
  "/experiences/:experienceId",
  removeStudentExperience
);

// Student resume

studentRouter.get(
  "/resume/file",
  getStudentResumeFile
);

studentRouter.get(
  "/resume",
  getStudentResume
);

studentRouter.post(
  "/resume",
  uploadSingleResume,
  uploadStudentResume
);

studentRouter.delete(
  "/resume",
  deleteStudentResume
);

export default studentRouter;