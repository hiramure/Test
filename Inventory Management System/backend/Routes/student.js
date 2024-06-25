import express from "express";
import {
  updateStudent,
  getSingleStudent,
  getAllStudent,
  deleteStudent,
} from "../Controllers/studentController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get(
  "/:id",
  authenticate,
  restrict(["student", "admin"]),
  getSingleStudent
);
router.get("/", authenticate, restrict(["admin"]), getAllStudent);
router.put("/:id", authenticate, restrict(["admin"]), updateStudent);
router.delete("/:id", authenticate, restrict(["admin"]), deleteStudent);

export default router;
