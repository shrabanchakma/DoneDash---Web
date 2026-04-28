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
      userEmail,
      status,
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
      userEmail,
      status,
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

// GET all jobs with Pagination
export const getJobs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const { category, minBudget, maxBudget } = req.query;

    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }

    const totalJobs = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      jobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET jobs by user email
export const getMyJobs = async (req, res) => {
  try {
    const { email } = req.query;

    // Latest practice: Ensure email exists before querying
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }

    const jobs = await Job.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    // If the ID is not a valid MongoDB ObjectId format, it throws a "CastError"
    res.status(500).json({ message: "Error fetching job details" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      location,
      deadline,
      budget,
      existingImages = [], // Default to empty array
      newImages = [], // Default to empty array
    } = req.body;

    // 1. Upload new images only if they exist
    let uploadedNewImages = [];
    if (newImages.length > 0) {
      uploadedNewImages = await Promise.all(
        newImages.map((img) => uploadImageToImgbb(img)),
      );
    }

    // 2. Merge existing URLs with new ones
    const updatedImages = [...existingImages, ...uploadedNewImages];

    // 3. Update in MongoDB
    const job = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        location,
        deadline,
        budget,
        images: updatedImages,
      },
      { new: true, runValidators: true },
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found. It might have been already deleted.",
      });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
};
