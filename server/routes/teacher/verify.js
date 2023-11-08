import { verifyToken } from "../../controllers/teacher.js";

export default async (req, res) => {
  try {
    const token = req.headers.authorization;
    

    console.log("Inside teacher" ,token)
    await verifyToken(token);
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};