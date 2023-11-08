import { loginParent } from "../../controllers/parent.js";

export default async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    let {parent,token} = await loginParent({ mobileNo, password });
    console.log(parent,token)
    res.json({status:"Success",parent:parent,token:token})
    
  } catch {
    res.json({status:"Wrong Credentials"})
  }
};