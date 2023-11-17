import Attendance from "../models/attendance.js";
import Student from "../models/student.js";
import jwt from "jsonwebtoken";
const sign = (obj) =>
  new Promise((resolve, reject) => {
    const oneHour = 60 * 60; // 60 seconds * 60 minutes = 1 hour
    const expirationTime = Math.floor(Date.now() / 1000) + oneHour; // Current time in seconds + 1 hour

    // Include the 'exp' claim in the payload
    obj.exp = expirationTime;
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token,process.env.jwtPrivateKey, (error) => {
      if (error) return reject();
      return resolve({ success: true });
    });
  });
  export const verifyToken = async (token) => {
    try {

      console.log(token)
      const student = jwt.decode(token);
      console.log(student)
  
      const findStudent = await Student.findOne({ _id: student.id });
      console.log("Inside verify" , findStudent)
      if (!findStudent) {
        return Promise.reject({ error: "Unauthorized" });
      }
      await verify(token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject({ error: "Unauthorized" });
    }
  }
export const loginStudent = async ({ admissionNo, password }) => {
    try {
      console.log("Inside COntroller")
      const student = await Student.findOne({admissionNo});
      console.log(student)
      await student.checkPassword(password);
      //await student.updateLoggedIn();
      const token = await sign({
      id: student._id,
      admissionNo: student.admissionNo,
      name: student.name,
      });
    
      return Promise.resolve({
        student,token
        
      });
    } catch (error) {
      console.log(error)
      return Promise.reject(error);
    }
  };
  export const registerStudent = async (studentDetails) => {
    try {
      console.log("Inside Controller")
      const admissionNo = studentDetails.admissionNo
      const student = await Student.find({admissionNo});
      if (student.length !== 0) {
             res.send ('User already exists');
           } else {
             Student.create(studentDetails)
           }
       
      return Promise.resolve("Success");
    } catch (error) {
      return Promise.reject(error);
    }
  };
  export const getStudentByGrade = async (grade) => {
    try{
      console.log(grade)
      const studentList = await Student.find(grade).exec();
      console.log(studentList)
      return studentList;
    }
    catch(error){
      return error;
    }
  } 
  export const getDetails = async (admissionNo) => {
    try{
      console.log(admissionNo)
      const student = await Student.findOne({admissionNo:admissionNo}).exec();
      console.log(student)
      return student;
    }
    catch(error){
      return error;
    }
  } 
  export const getStudentList = async () => {
    try{

      const studentList = await Student.find().exec();
      console.log(studentList)
      return studentList;
    }
    catch(error){
      return error;
    }

  }
  
export const fetchAttendance = async (admissionNo) => {
  try{
  const attendanceData = Attendance.find({admissionNo:admissionNo});
  console.log(attendanceData);
  return attendanceData;
  }
  catch(error)
{
  return error
}


}
export const fetchAttendanceBySubject = async (admissionNo,subject) => {
  try{
  const attendanceData = Attendance.find({admissionNo:admissionNo,subject:subject});
  console.log(attendanceData);
  return attendanceData;
  }
  catch(error)
{
  return error
}


}