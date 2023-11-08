import Student from "../models/student.js";
export const updateMarks = async (exam,subject,marks) => {
    try {
        const studentIds = Object.keys(marks);
    
        // Create a dynamic update object based on the exam variable
        const updateObject = {
          $push: {},
        };
        updateObject.$push[`marks.${exam}`] = {
          subject: subject,
          mark: marks,
        };
    
        // Iterate through studentIds and update their marks
        for (const studentId of studentIds) {
          const newMark = marks[studentId];
          console.log(newMark);
          const updateObject = {
            $push: {},
          };
          updateObject.$push[`marks.${exam}`] = {
            subject: subject,
            mark: newMark,
          };
    
          await Student.updateOne({ _id: studentId }, updateObject);
        }
    
       Promise.resolve("Success")
      } catch (error) {
        console.error(error);
        Promise.reject(error)
      }
    };

