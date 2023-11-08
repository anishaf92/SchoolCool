import { addSubject } from "../../controllers/subject.js";

export default async (req, res) => {
  try {
    const {subjectName,grade} = req.body
    console.log(req.body)
    const subject = await addSubject( {subjectName,grade});
    console.log("inside",{subject})
    if(subject === "Subject already exists"){
        res.json({status:"Subject already exists"})
    }
    else{
    res.json({ status:"Subject Added",subject });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
