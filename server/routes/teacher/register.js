import { registerTeacher } from "../../controllers/teacher.js";

export default async (req, res) => {
  try {
    const teacherDetails = req.body;
    console.log(teacherDetails)
    let newTeacher = await registerTeacher(teacherDetails);
    console.log(newTeacher)
    res.send({status:"Success",data:teacherDetails})
    
  } catch {
    res.send({status:"Wrong Credentials"})
  }
};