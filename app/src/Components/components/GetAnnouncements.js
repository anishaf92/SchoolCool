import React, { useState, useEffect } from "react";
import "../../Css/dashboard.css";
import moment from "moment";

const AnnouncementsPerPage = 3;

const GetAnnouncements = () => {
  const [announcementList, setAnnouncementList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${url}/admin/getannouncements`)
      .then((response) => response.json())
      .then((data) => {
        setAnnouncementList(data);
      });
      //eslint-disable-next-line  
  }, []);

  // Calculate the range of announcements to display for the current page
  const indexOfLastAnnouncement = currentPage * AnnouncementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - AnnouncementsPerPage;
  const currentAnnouncements = announcementList.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(announcementList.length / AnnouncementsPerPage);

  return (
    <div className="announcements">
      <h3>Announcements</h3>
      {currentAnnouncements.map((announcement, key) => (
        <div className="announcements-block" key={key}>
          <h4>{announcement.title}</h4>
          <span>
            {moment(announcement.createdAt).utc().format("DD/MM/YYYY")}
          </span>
          <p>{announcement.content}</p>
        </div>
      ))}

      {/* Pagination controls */}
      <div className="pagination">
      <div className="circle-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`circle ${currentPage === index + 1 ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default GetAnnouncements;
