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
      imageBase64,
    } = req.body;

    // 1. Upload image using the helper above
    const imageUrl = await uploadImageToImgbb(imageBase64);
    // const imageUrl = "somethingImage";

    // 2. Create database entry
    const job = await Job.create({
      title,
      description,
      category,
      location,
      deadline,
      budget,
      image: imageUrl,
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
