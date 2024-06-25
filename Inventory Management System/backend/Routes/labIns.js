import express from "express";
import {
  updateInstructor,
  deleteInstructor,
  getAllInstuctor,
  getSingleInstructor,
  getInstructorProfile,
} from "../Controllers/labInsController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get(
  "/:id",
  authenticate,
  restrict(["admin", "labInstructor"]),
  getSingleInstructor
);
router.get("/", authenticate, restrict(["admin"]), getAllInstuctor);
router.put(
  "/:id",
  authenticate,
  restrict(["admin", "labInstructor"]),
  updateInstructor
);
router.delete("/:id", authenticate, restrict(["admin"]), deleteInstructor);

router.get(
  "/profile/me",
  authenticate,
  restrict(["labInstructor"]),
  getInstructorProfile
);

export default router;
