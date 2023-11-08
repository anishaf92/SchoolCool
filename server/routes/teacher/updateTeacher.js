import { updateTeacher } from "../../controllers/teacher.js";
export default (req, res) => {
    try{
    const {id} =  req.params
    console.log("inside " ,req.body)
    const subjectId = req.body.subjectId;
    console.log(id, subjectId)
    const data = updateTeacher(id,subjectId)
    console.log(data)
    res.json({result:"Success"})
    }
    catch(error){
        res.send(error)
    }
}