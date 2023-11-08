import { updateSubjectTable } from "../../controllers/subject.js";


export default async (req, res) => {
  try{
  const {id,teacher} = req.body
  const result = await updateSubjectTable({id,teacher});
  res.json(result)
  
  }
  catch(error){
    res.json({status:"Error"})
  }
};