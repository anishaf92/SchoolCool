import Admin from "../models/admin.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Announcement from "../models/announcement.js";
import jwt from "jsonwebtoken";
import { Mongoose } from "mongoose";
import Subject from "../models/subject.js";
const sign = (obj) =>
  new Promise((resolve, reject) => {
    const oneHour = 60 * 60; // 60 seconds * 60 minutes = 1 hour
    const expirationTime = Math.floor(Date.now() / 1000) + oneHour; // Current time in seconds + 1 hour

    // Include the 'exp' claim in the payload
    obj.exp = expirationTime;
    jwt.sign(obj, "chocolatemegadonut", (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, "chocolatemegadonut", (error) => {
      if (error) return reject();
      return resolve({ success: true });
    });
  });
  export const verifyAdminToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      console.log("Token:", token);
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const admin = jwt.decode(token);
      console.log("Decoded Token:", admin);
  
      if (!admin || !admin.id) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      const findAdmin = await Admin.findOne({ _id: admin.id });
      console.log("Inside verify", findAdmin);
  
      if (!findAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Token is valid, continue to the next middleware
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
export const loginAdmin = async ({ userName, password }) => {
    try {
      const admin = await Admin.findOne({ userName})
      console.log(admin)
      await admin.checkPassword(password);
      await admin.updateLoggedIn();
      console.log(admin)
      const token = await sign({
        id: admin._id,
        userName: admin.userName
        });
      console.log(token)
      return Promise.resolve({admin,token});
    } catch (error) {
      return Promise.reject(error);
    }
  };
  export const registerAdmin = async (adminDetails) => {
    try {
      console.log("Inside Controller")
      const userName = adminDetails.userName
      const admin = await Admin.find({userName});
      console.log(admin)
      if (admin.length !== 0) {
             res.send ('User already exists');
           } else {
             Admin.create(adminDetails)
           }
       
      return Promise.resolve("Success");
    } catch (error) {
      return Promise.reject(error);
    }
  };
  export const getStudentApprovals = () => {
    return Student.find({isApproved:false});
  };
  export const getTeacherApprovals = () => {
    return Teacher.find({isApproved:false});
  };
  export const approve = (id,user) => {
    console.log("inside",id)
    if(user === "student"){
    Student.findByIdAndUpdate(id, { isApproved: true })
  .then(result => {
    console.log('Update successful', result);
    return result
  })
  .catch(error => {
    console.error('Update error', error);
    return error
  });
}
else{
  Teacher.findByIdAndUpdate(id, { isApproved: true })
  .then(result => {
    console.log('Update successful', result);
    return result
  })
  .catch(error => {
    console.error('Update error', error);
    return error
})
}
};
export const deleteUser = (id,user) => {
  console.log("inside",id)
  if(user === "student"){
    Student.deleteOne({_id:id})
.then(result => {
  console.log('Delete successful', result);
  return result
})
.catch(error => {
  console.error('Delete error', error);
  return error
});
}
else{
Teacher.deleteOne({_id:id})
.then(result => {
  console.log('Delete successful', result);
  return result
})
.catch(error => {
  console.error('Delete error', error);
  return error
})
}
};
