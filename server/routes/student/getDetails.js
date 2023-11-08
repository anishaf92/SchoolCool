import { getDetails } from "../../controllers/student.js";

export default async (req, res) => {
  try {
    const  admissionNo  = req.params.admissionNo;

    console.log(admissionNo)
    let student = await getDetails(admissionNo);
    console.log(student)
    res.json({status:"Success",student:student})
    
  } catch {
    res.json({status:"Wrong Credentials"})
  }
};