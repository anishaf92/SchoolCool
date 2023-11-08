import { registerAdmin } from "../../controllers/admin.js";

export default async (req, res) => {
  try {
    const adminDetails = req.body;
    console.log(adminDetails)
    let newAdmin = await registerAdmin(adminDetails);
    console.log(newAdmin)
    res.send({status:"Success", data:adminDetails})
    
  } catch {
    res.send({status:"Wrong Credentials"})
  }
};