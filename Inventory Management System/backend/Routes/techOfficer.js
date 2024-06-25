import express from "express";
import {
  updateTechOfficer,
  deleteTechOfficer,
  getAllTechOfficer,
  getSingleTechOfficer,
  getTechOfficerProfile,
} from "../Controllers/toController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get(
  "/:id",
  authenticate,
  restrict(["admin", "techOfficer"]),
  getSingleTechOfficer
);
router.get("/", authenticate, restrict(["admin"]), getAllTechOfficer);
router.put(
  "/:id",
  authenticate,
  restrict(["admin", "techOfficer"]),
  updateTechOfficer
);
router.delete("/:id", authenticate, restrict(["admin"]), deleteTechOfficer);
router.get(
  "/profile/me",
  authenticate,
  restrict(["techOfficer"]),
  getTechOfficerProfile
);

export default router;
