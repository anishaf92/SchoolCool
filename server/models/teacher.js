import { mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
const { ObjectId } = Schema.Types;
const addressSchema = new mongoose.Schema({
    addressLine1:{
        type: String,
        required: true,
    },
    addressLine2:{
        type: String,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    pinCode:{
        type: Number,
        required: true,
    }
})
const teacherSchema = new mongoose.Schema ({
    empNo:{
        type: Number,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required:true,
    },
    subject1:{
        type: String,
        required: true,
    },
    subject2:{
        type: String,
        required: true,
    },
    contactNo:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    address:{
        type: addressSchema,
        required:true
              },
    classCount:{
        type:Number,
        default:0
    },
    subjectId:{
        type:[ObjectId],
        ref:"subject",
        default:null
        
    }
    })
teacherSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  teacherSchema.methods.checkPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };
const Teacher = new mongoose.model ('Teacher', teacherSchema);
export default Teacher;