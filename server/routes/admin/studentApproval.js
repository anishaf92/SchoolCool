import { getStudentApprovals } from "../../controllers/admin.js";


export default async (req, res) => {
  const pendingApprovals = await getStudentApprovals();
  //console.log(pendingApprovals)
  res.send(pendingApprovals)
  
};