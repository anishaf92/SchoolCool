import { getTeacherByGrade } from "../../controllers/teacher.js";

export default async (req, res) => {
    try{
    const grade = req.params.grade;
    console.log(grade)
    const teacherList = await getTeacherByGrade(parseInt(grade));
    console.log(teacherList)
    res.json({status:"Success", teacherList:teacherList})
    }
    catch(error)
    {
        res.send(error)
    }

};