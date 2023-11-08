import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});



const Announcement = model("Announcement", announcementSchema);

export default Announcement;
