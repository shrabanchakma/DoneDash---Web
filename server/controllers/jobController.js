import axios from "axios";
import Job from "../models/Job.js";

// Helper: Upload Logic
const uploadImageToImgbb = async (base64Image) => {
  const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const data = new URLSearchParams();
  data.append("image", base64Image);

  const response = await axios.post(url, data);
  return response.data.data.url;
};

// Controller: Create Job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      deadline,
      budget,
      imagesBase64,
    } = req.body;

    // 1. Upload image using the helper above
    const uploadedImageUrls = await Promise.all(
      imagesBase64.map((image) => uploadImageToImgbb(image)),
    );
    // const imageUrl = "somethingImage";

    // 2. Create database entry
    const job = await Job.create({
      title,
      description,
      category,
      location,
      deadline,
      budget,
      images: uploadedImageUrls,
    });

    res.status(201).json(job);
  } catch (error) {
    // 500 is a generic error; 400 might be better if the user sent bad data
    res
      .status(500)
      .json({ message: error.message, imgbbAPI: process.env.IMGBB_API_KEY });
  }
};

export { uploadImageToImgbb };

// GET all jobs
export const getJobs = async (req, res) => {
  try {
    // .find() gets everything, .sort({ createdAt: -1 }) puts newest first
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch jobs" });
  }
};
