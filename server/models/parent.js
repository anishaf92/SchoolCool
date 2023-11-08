import mongoose from "mongoose";
import bcrypt from "bcrypt";
const parentSchema = new mongoose.Schema ({
    mobileNo:{
        type: Number,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    admissionNo:{
      type:Number,
      required: true
    },
    name:{
        type:String,

    }
    })
    parentSchema.pre("save", function (next) {
        if (!this.isModified("password")) {
          return next();
        }
        this.password = bcrypt.hashSync(this.password, 10);
        next();
      });
      
      parentSchema.methods.checkPassword = async function (password) {
        const match = await bcrypt.compare(password, this.password);
        if (match) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      };
      
  
      
const Parent = new mongoose.model ('Parent', parentSchema);
export default Parent;