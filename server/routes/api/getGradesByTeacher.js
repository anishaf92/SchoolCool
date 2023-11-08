import { getGradesByTeacher } from "../../controllers/teacher.js";

export default async (req, res) => {
    try{
   const id = req.params.id;
   console.log(id)
    const gradesList = await getGradesByTeacher(id);
    console.log(gradesList)
    res.json({status:"Success", gradesList:gradesList})
    }
    catch(error)
    {
        res.send(error)
    }

};