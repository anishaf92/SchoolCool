import { verifyToken } from "../../controllers/admin.js";

export default async (req, res) => {
  try {
    console.log(req.body)
    let {token}  = req.body;
    console.log("Inside admin" ,token)
    await verifyToken(token);
    res.json({ status: true });
  } catch (error) {
    res.status(403).json(error);
  }
};