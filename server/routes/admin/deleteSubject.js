import { deleteSubject   } from "../../controllers/subject.js";
export default (req, res) => {
    try{
    const {id} =  req.params
    console.log(id)
    const data = deleteSubject(id,"teacher")
    console.log(data)
    res.json({result:"Success",data})
    }
    catch(error){
        res.send(error)
    }
}