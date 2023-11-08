import { getAnnouncements } from "../../controllers/announcement.js";


export default async (req, res) => {
  const announcements = await getAnnouncements();
  console.log(announcements)
  res.json(announcements)
  
};