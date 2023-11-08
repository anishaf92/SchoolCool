import { updateAttendance } from "../../controllers/teacher.js";

export default async (req, res) => {
    const {subject,grade,date,attended} = req.body;
    console.log(req.body)
    try{
    await updateAttendance({subject,grade,date,attended})
    res.json({result:"Success"})
    }
    catch(error){
        res.send(error)
    }
}