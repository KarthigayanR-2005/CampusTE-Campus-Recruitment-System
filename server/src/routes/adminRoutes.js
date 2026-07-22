import { Router } from "express";

import {
  createPlacementOfficer,
  getPendingApprovals,
  getPlacementOfficers,
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

adminRouter.get(
  "/placement-officers",
  getPlacementOfficers
);

adminRouter.post(
  "/placement-officers",
  createPlacementOfficer
);

export default adminRouter;