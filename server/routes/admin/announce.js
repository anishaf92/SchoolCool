import { createAnnouncement } from "../../controllers/announcement.js";

export default async (req, res) => {
  try {
    const {title, content} = req.body
    console.log(req.body)
    const announcement = await createAnnouncement(req.body);
    console.log("inside",{announcement})
    res.json({ announcement });
  } catch (error) {
    res.status(401).json({ error });
  }
};
