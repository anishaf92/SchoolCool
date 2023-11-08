import {mongoose,Schema} from "mongoose";
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
const examSchema = new mongoose.Schema ({
    subject:{
        type: String
    },
    mark:{
        type: Number,

    }
})
const markSchema = new mongoose.Schema ({
    midTerm1:{
        type:[examSchema],
    },
    midTerm2:{
        type:[examSchema],
    },
    midTerm3:{
        type:[examSchema],
    },
    quarterly:{
        type:[examSchema],
    },
    halfYearly:{
        type:[examSchema],
    },
    finalExam:{
        type:[examSchema]
    }

})
const studentSchema = new mongoose.Schema ({
    admissionNo:{
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
    dob:{
        type: Date,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    grade:{
        type: Number,
        required: true,
    },
    parentName:{
        type: String,
        required: true,
    },
    parentNo:{
        type: Number,
        required: true,
    },
    parentEmail:{
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
    marks:{
        type: markSchema,
    }
    })
studentSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  studentSchema.methods.checkPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };
const Student = new mongoose.model ('Student', studentSchema);
export default Student;