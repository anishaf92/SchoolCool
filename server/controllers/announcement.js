import Announcement from '../models/announcement.js';
export const getAnnouncements = () => {
  return Announcement.find().sort({createdAt:-1});
};
export const createAnnouncement = ({title, content, createdBy}) => {
  Announcement.create ({title, content, createdBy})
    .then (result => {
      console.log ('Create successful', result);
      return result;
    })
    .catch (error => {
      console.error ('Create error', error);
      return error;
    });
};
export const deleteAnnouncement = (id) =>{
  Announcement.deleteOne({_id:id})
  .then(result => {
    console.log('Delete successful', result);
    return result
  })
  .catch(error => {
    console.error('Delete error', error);
    return error
  });
}