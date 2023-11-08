import { getTeacher } from "../../controllers/teacher.js";


export default async (req, res) => {
  const id = req.params;
  try{
  const teacher = await getTeacher(id);
  console.log(teacher)
  res.json({status: "Success" ,teacher :teacher})
  }
  catch(error){
    res.send(error)

  }
  
};