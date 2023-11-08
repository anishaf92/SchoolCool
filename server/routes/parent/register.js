import { registerParent } from "../../controllers/parent.js";

export default async (req, res) => {
  try {
    const parentDetails = req.body;
    console.log(parentDetails)
    console.log(parentDetails)
    let newParent = await registerParent(parentDetails);
    console.log(newParent)
    res.send({status:"Success",data:newParent})
    
  } catch {
    res.send({status:"Wrong Credentials"})
  }
};