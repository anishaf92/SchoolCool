import { getTeacherApprovals } from "../../controllers/admin.js";


export default async (req, res) => {
  const pendingApprovals = await getTeacherApprovals();
  console.log(pendingApprovals)
  res.send(pendingApprovals)
  
};