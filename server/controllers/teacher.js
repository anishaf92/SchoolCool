import Subject from "../models/subject.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import Attendance from "../models/attendance.js"
import jwt from "jsonwebtoken";
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
  export const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      console.log("Token:", token);
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const teacher = jwt.decode(token);
      console.log("Decoded Token:", teacher);
  
      if (!teacher || !teacher.id) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      const findTeacher = await Teacher.findOne({ _id: teacher.id });
      console.log("Inside verify", findTeacher);
  
      if (!findTeacher) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Token is valid, continue to the next middleware
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
  

export const loginTeacher = async ({ empNo, password }) => {
    try {
      console.log("Inside Controller")
      const teacher = await Teacher.findOne({empNo});
      console.log(teacher)
      await teacher.checkPassword(password);
      //await student.updateLoggedIn();
      const token = await sign({
        id: teacher._id,
        admissionNo: teacher.empNo,
        name: teacher.name,
        });
      
        return Promise.resolve({
            teacher,token
          
        });
      
    } catch (error) {
      return Promise.reject(error);
    }
  };
  export const registerTeacher = async (teacherDetails) => {
    try {
      console.log("Inside Controller")
      const empNo = teacherDetails.empNo
      const teacher = await Teacher.find({empNo});
      if (teacher.length !== 0) {
             res.send ('User already exists');
           } else {
             Teacher.create(teacherDetails)
           }
       
      return Promise.resolve("Success");
    } catch (error) {
      return Promise.reject(error);
    }
  };
  export const getTeachers = () => {
    return Teacher.find ();
  };
  export const updateTeacher = async (id, subjectId) => {
    try{
    console.log("Inside Controller");
      const teacher = await Teacher.updateOne({ _id: id }, { $addToSet: { subjectId : subjectId  } })
      const updateCount = await Teacher.updateOne({ _id: id },{$set:{ classCount : subjectId.length }})
      console.log(teacher,updateCount);
      return teacher;
    } catch (error) {
      console.error(error);
      return error;
    }
      
  };
  
  export const updateTeacherInfo = async (id, {contactNo, email, address}) => {
    try{
    console.log("Inside Controller");
      const result = await Teacher.findOneAndUpdate({ _id: id }, { $set: {contactNo, email, address} }, {
        new: true
      });
      console.log(result)
      return Promise.resolve(result);;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
      
  };
  export const getTeacher = async (id) => {
    try{
    const teacher = await Teacher.find({_id:id, isApproved:true});
    console.log(teacher)
    return teacher;
    }
    catch(error){
      return error;
    }
  }
  export const getGradesByTeacher = async (id) => {
    try{

      const gradeList = await Subject.find({teacher:id}).exec();
      console.log(gradeList)
      return gradeList;
    }
    catch(error){
      return error;
    }

  }
  export const getTeacherByGrade = async (grade) => {
    try{
      console.log(grade)
      const subjectDetails = await Subject.find({grade:grade}).exec();
      const teacherList = subjectDetails.map((subject) => subject.teacher)
      console.log("inside",teacherList)
      const teachers = await Teacher.find({ _id: { $in: teacherList } }).exec();
      // 'teachers' will contain an array of teacher documents whose IDs are in 'teacherList'
  
      const teacherDetails = teachers.map((teacher) => ({
        _id: teacher._id,
        name: teacher.name,
      }));
      
      return teacherDetails;

    
    }
    catch(error){
      return error;
    }

  }
  export const updateAttendance = ({ subject, grade, date, attended }) => {
    const createAttendancePromises = attended.map(({ admissionNo, attendance }) => {
      console.log("Inside controller",{ admissionNo, subject, grade, date, attendance });
      return Attendance.create({ admissionNo, subject, grade, date, attendance });
    });
  
    return Promise.all(createAttendancePromises)
      .then((results) => {
        console.log('Attendance records created successfully', results);
        return results;
      })
      .catch((error) => {
        console.error('Error creating attendance records', error);
        throw error;
      });
  };
  