import { registerStudent } from "../../controllers/student.js";

export default async (req, res) => {
  try {
    const studentDetails = req.body;
    console.log(studentDetails)
    let newStudent = await registerStudent(studentDetails);
    console.log("FInal",newStudent)
    res.send({status:"Success",data:studentDetails})
    
  } catch {
    res.send({status:"Wrong Credentials"})
  }
};