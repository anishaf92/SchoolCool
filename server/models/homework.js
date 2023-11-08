import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const homeworkSchema = new Schema({
  grade: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content:{
    type:String,
    required:true,
  },
  createdBy: {
    type: ObjectId,
    ref: "teacher",
    required: true,
  },
  homeWorkFor: { type: Date, required:true },
});



const Homework = model("Homework", homeworkSchema);

export default Homework;
