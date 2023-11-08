import {mongoose,Schema} from "mongoose";
const { ObjectId } = Schema.Types;
const subjectSchema = new mongoose.Schema ({
    subjectName:{
        type: String,
        unique:false,
        required: true,
    },
    grade:{
        type:Number,
        unique:false,
        required:true,
    },
    teacher:{
        type:ObjectId,
        ref:"Teacher",
        default:null
    }
    })
const Subject = new mongoose.model('Subject', subjectSchema);
export default Subject;