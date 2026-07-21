import { Router } from "express";

import {
  getPendingApprovals,
  reviewUserApproval,
} from "../controllers/adminController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

import {
  authorizeRoles,
} from "../middleware/authorizeRoles.js";

const adminRouter = Router();

adminRouter.use(
  authenticate,
  authorizeRoles("admin")
);

adminRouter.get(
  "/approvals",
  getPendingApprovals
);

adminRouter.patch(
  "/approvals/:userId",
  reviewUserApproval
);

export default adminRouter;