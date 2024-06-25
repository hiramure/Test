import express from "express";
import {
  createRequest,
  updateRequest,
  removeRequest,
  getRequestById,
  fetchRequest,
  getRequestByUser,
} from "../Controllers/LoaningController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.route("/", authenticate).post(createRequest);
router
  .route("/:id", authenticate, restrict(["techOfficer"]))
  .put(updateRequest);
router.route("/:id", authenticate).delete(removeRequest);
router.route("/", authenticate).get(fetchRequest);
router.route("/:id", authenticate).get(getRequestById);
router.route("/user/:requestFrom", authenticate).get(getRequestByUser);

export default router;
