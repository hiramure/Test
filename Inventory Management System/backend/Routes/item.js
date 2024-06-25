import express from "express";
import formidable from "express-formidable";
import {
  addItem,
  updateItem,
  removeItem,
  fetchItem,
  getItemById,
  getPhoto,
  getItemsByCategory,
} from "../Controllers/ItemController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

router.route("/", authenticate, restrict(["techOfficer"])).post(addItem);
router.route("/:id", authenticate, restrict(["techOfficer"])).put(updateItem);
router
  .route("/:id", authenticate, restrict(["techOfficer"]))
  .delete(removeItem);
router.route("/", authenticate).get(fetchItem);
router.route("/:id", authenticate).get(getItemById);
router.route("/photo/:id", authenticate).get(getPhoto);
router
  .route("/category/items/:categoryTest", authenticate)
  .get(getItemsByCategory);
export default router;
