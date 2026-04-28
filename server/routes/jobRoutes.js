import express from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  getMyJobs,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// POST /api/jobs
router.post("/", createJob);
router.get("/", getJobs);
router.get("/user/jobs", getMyJobs);
router.get("/:id", getJobById);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
