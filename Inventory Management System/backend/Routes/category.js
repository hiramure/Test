import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
  searchCategory,
} from "../Controllers/CatogaryController.js";

const router = express.Router();
router.route("/", authenticate, restrict(["techOfficer"])).post(createCategory);
router
  .route("/:categoryId/", authenticate, restrict(["techOfficer"]))
  .put(updateCategory);
router
  .route("/:categoryId/", authenticate, restrict(["techOfficer"]))
  .delete(removeCategory);
router.route("/categories", authenticate).get(listCategory);
router.route("/:id", authenticate).get(readCategory);
router.route("/").get(searchCategory);

export default router;
