import mongoose from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new mongoose.Schema ({
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastLoggedIn:{
      type:Date,
    }
    })
    adminSchema.pre("save", function (next) {
        if (!this.isModified("password")) {
          return next();
        }
        this.password = bcrypt.hashSync(this.password, 10);
        next();
      });
      
    adminSchema.methods.checkPassword = async function (password) {
        const match = await bcrypt.compare(password, this.password);
        if (match) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      };
      
    adminSchema.methods.updateLoggedIn = function () {
        return this.model("Admin").findOneAndUpdate(
          { userName: this.userName },
          { lastLoggedIn: new Date() }
        );
      };
      
const Admin = new mongoose.model ('Admin', adminSchema);
export default Admin;