import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyControllers.js";
const router = express.Router();

router.post("/create", createResidency);
router.get("/view-all-residencies", getAllResidencies);
router.get("/:id", getResidency);

export { router as residencyRoutes };
