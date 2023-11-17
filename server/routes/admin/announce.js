import { createAnnouncement } from "../../controllers/announcement.js";

export default async (req, res) => {
  try {
    const {title, content,createdBy} = req.body
    console.log("Printing",req.body)
    const announcement = await createAnnouncement(title, content,createdBy );
    console.log("inside",announcement)
    res.json({ announcement });
  } catch (error) {
    res.status(401).json({ error });
  }
};
