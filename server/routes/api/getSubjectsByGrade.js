import { getSubjectsByGrade } from "../../controllers/subject.js";

export default async (req, res) => {
    try{
    const grade = req.params;
    console.log(grade)
    const subjectList = await getSubjectsByGrade(grade);
    console.log(subjectList)
    res.json({status:"Success", subjectList:subjectList})
    }
    catch(error)
    {
        res.send(error)
    }

};