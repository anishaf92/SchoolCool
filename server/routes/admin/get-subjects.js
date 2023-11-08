import { getSubjects } from "../../controllers/subject.js";


export default async (req, res) => {
  const subjects = await getSubjects();
  console.log(subjects)
  res.json(subjects)
};