import { verifyToken } from "../../controllers/student.js";

export default async (req, res) => {
  try {
    console.log(req.body)
    let {token}  = req.body;
    console.log("Inside student" ,token)
    await verifyToken(token);
    res.json({ status: true });
  } catch (error) {
    res.status(403).json(error);
  }
};