import { deleteAnnouncement   } from "../../controllers/announcement.js";
export default async (req, res) => {
    try{
    const {id} =  req.params
    console.log(id)
    await deleteAnnouncement(id);
    res.json({result:"Success"})
    }
    catch(error){
        res.send(error)
    }
}