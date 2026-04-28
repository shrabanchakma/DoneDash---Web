import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// connect DB
connectDB();

// routes
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("DoneDash API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
