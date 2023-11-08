import { updateMarks } from "../../controllers/marks.js";

export default async (req, res) => {
    const subject = req.body.subject;
    const exam = req.body.exam;
    const marks = req.body.marks;
    console.log(subject, marks)
    try{
    await updateMarks(exam, subject, marks)
    res.json({result:"Success"})
    }
    catch(error){
        res.send(error)
    }
}