import Subject from "../models/subject.js";
export const addSubject = async ({subjectName, grade}) => {
  try {
    console.log ('Inside Controller');
    const subject = await Subject.find({subjectName, grade});
    if (subject.length !== 0) {
      return "Subject already exists"
    } else {
      Subject.create ({subjectName, grade});
    }

    return Promise.resolve ('Success');
  } catch (error) {
    return Promise.reject (error);
  }
};
export const getSubjects = () => {
  return Subject.find();
};
export const getSubjectsByTeacher = async (ids) => {
  try{
    const result = await Promise.all(ids.map((id) => Subject.findById(id).exec()));
    return result;
  }
  catch(error){
    return error;
  }

};
export const getSubjectsByGrade = async (grade) => {
  try{
    const subjectList = await Subject.find(grade).exec();
      console.log(subjectList)
      return subjectList;
  }
  catch(error){
    return error;
  }

};
export const getUniqueSubjects = () => {
    return Subject.distinct("subjectName");
  };
export const deleteSubject = id => {
  Subject.deleteOne ({_id: id})
    .then (result => {
      console.log ('Delete successful', result);
      return result;
    })
    .catch (error => {
      console.error ('Delete error', error);
      return error;
    });
};
export const updateSubjectTable = ({id,teacher})  => {
  console.log({id,teacher})
  Subject.updateOne({_id:id},{$set : {teacher:teacher}})
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error;
  });
    
};
