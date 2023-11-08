import { fetchMessages } from "../../controllers/message.js";

export default async (req, res) => {
    try{
   const receiver = req.params.receiver;
   const sender = req.params.sender;
   console.log("Fetch",receiver,sender)
    const messages = await fetchMessages(sender,receiver);
    console.log(messages)
    res.json({status:"Success", messages:messages})
    }
    catch(error)
    {
        res.send(error)
    }

};