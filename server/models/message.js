import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const messageSchema = new Schema({
  senderId: {
    type: ObjectId,
    required: true,
  },
  senderType: {
    type: String,
    enum: ['student', 'teacher'],
    required: true,
  },
  receiverId: {
    type: ObjectId,
    required: true,
  },
  receiverType: {
    type: String,
    enum: ['student', 'teacher'],
    required: true,
  },
  message: {
    type: [String],
  },
  newMessage:{
    type: [String]
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = new model('Message', messageSchema);

export default Message;