import { getTeachers } from "../../controllers/teacher.js";


export default async (req, res) => {
  const teachers = await getTeachers();
  console.log(teachers)
  res.json(teachers)
  
};