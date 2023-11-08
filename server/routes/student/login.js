import { loginStudent } from "../../controllers/student.js";

export default async (req, res) => {
  try {
    const { admissionNo, password } = req.body;
    console.log(admissionNo)
    let {student,token} = await loginStudent({ admissionNo, password });
    console.log(student,token)
    res.json({status:"Success",student:student,token:token})
    
  } catch {
    res.json({status:"Wrong Credentials"})
  }
};