import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const attendanceSchema = new Schema({
  admissionNo: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    
    required: true,
  },
  date: { type: Date, required:true },
  attendance:{
    type : String,
    required : true
  }
});



const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
