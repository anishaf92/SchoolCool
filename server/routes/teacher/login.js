import { loginTeacher } from "../../controllers/teacher.js";

export default async (req, res) => {
  try {
    const { empNo, password } = req.body;
    console.log(empNo)
    let {teacher,token} = await loginTeacher({ empNo, password });
    console.log("inside route" ,teacher)
    // req.session.user = {
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   lastLoggedIn: user.lastLoggedIn,
    // };
    res.json({status:"Success",teacher,token})
    
  } catch {
    res.send({status:"Wrong Credentials"})
  }
};