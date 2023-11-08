import { approve } from "../../controllers/admin.js";
export default (req, res) => {
    try{
    const {id} =  req.params
    console.log(id)
    const data = approve(id,"teacher")
    console.log(data)
    res.json({result:"Success"})
    }
    catch(error){
        res.send(error)
    }
}