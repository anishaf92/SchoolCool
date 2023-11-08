import jwt from "jsonwebtoken";
import Parent from "../models/parent.js";
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
  export const verifyToken = async (token) => {
    try {

      console.log(token)
      const parent = jwt.decode(token);
      console.log(parent)
  
      const findParent = await Parent.findOne({ _id: parent.id });
      console.log("Inside verify" , findParent)
      if (!findParent) {
        return Promise.reject({ error: "Unauthorized" });
      }
      await verify(token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject({ error: "Unauthorized" });
    }
  }
  export const loginParent = async ({ mobileNo, password }) => {
    try {
      console.log("Inside COntroller")
      const parent = await Parent.findOne({mobileNo});
      console.log(parent)
      await parent.checkPassword(password);
      const token = await sign({
      id: parent._id,
      mobileNo: parent.mobileNo,
      });
    
      return Promise.resolve({
        parent,token
        
      });
    } catch (error) {
      console.log(error)
      return Promise.reject(error);
    }
  };
  export const registerParent = async (parentDetails) => {
    try {
      console.log("Inside Controller")
      const mobileNo = parentDetails.mobileNo
      const parent = await Parent.find({mobileNo});
      if (parent.length !== 0) {
             res.send ('User already exists');
           } else {
             Parent.create(parentDetails)
           }
       
      return Promise.resolve("Success");
    } catch (error) {
      return Promise.reject(error);
    }
  };
 