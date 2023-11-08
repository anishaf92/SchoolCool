import { getStudentByGrade } from "../../controllers/student.js";

export default async (req, res) => {
    try{
    const grade = req.params;
    console.log(grade)
    const studentList = await getStudentByGrade(grade);
    console.log(studentList)
    res.json({status:"Success", studentList:studentList})
    }
    catch(error)
    {
        res.send(error)
    }

};