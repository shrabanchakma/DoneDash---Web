import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";

const router = express.Router();

// POST /api/jobs
router.post("/", createJob);
router.get("/", getJobs);

export default router;
