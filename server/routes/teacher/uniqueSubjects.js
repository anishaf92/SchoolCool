import { getUniqueSubjects } from "../../controllers/subject.js";


export default async (req, res) => {
  const subjects = await getUniqueSubjects();
  console.log(subjects)
  res.json(subjects)
};