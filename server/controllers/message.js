import Message from "../models/message.js";
export const fetchMessages = async (sender,receiver) => {
    try{
    const messages = await Message.find({senderId:sender,receiverId:receiver}).exec();
    console.log("Inside controller",messages)
      return messages;
      }
      catch (error)  {
        console.error ('Create error', error);
        return error;
      };
  };