import { getSubjectsByTeacher } from "../../controllers/subject.js";


export default async (req, res) => {
  const ids = req.body.ids;
  console.log(ids)
  try{
  const subjects = await getSubjectsByTeacher(ids);
  console.log("FInal",subjects)
  res.json({status: "Success" ,subjects :subjects})
  }
  catch(error){
    res.send(error)

  }
  
};