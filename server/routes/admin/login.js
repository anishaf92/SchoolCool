import { loginAdmin } from "../../controllers/admin.js";

export default async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(userName,password)
    let {admin,token} = await loginAdmin({ userName, password });
    console.log(admin)
    res.send({status:"Success",admin:admin,token:token})
  } catch(error) {
    res.send({status:"Wrong Credentials",error})
  }
};