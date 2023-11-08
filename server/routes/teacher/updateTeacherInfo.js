import { updateTeacherInfo } from "../../controllers/teacher.js";
export default async (req, res) => {
    try{
    const {id} =  req.params
    console.log(req.body)
    const {contactNo, email, address} = req.body
    console.log({contactNo, email, address})
    const data = await updateTeacherInfo(id,{contactNo, email, address})
   console.log("after modification",data)
    res.json({result:"Success",teacherData:data})
    }
    catch(error){
        res.send(error)
    }
}