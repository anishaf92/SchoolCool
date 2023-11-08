import React,{ useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";


const Announcements = () => {
  const admin = useSelector((state) => state.admin.admin);
  const token = useSelector((state) => state.admin.token);
  
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [refresh,setRefresh] = useState(false)
    const [announcementList,setAnnouncementList] = useState([])
    const navigate = useNavigate();
    const handleAnnouncement = async () =>{
      console.log("Inside handle announcemnt", token)
      const id = localStorage.getItem("user")
      await fetch('http://localhost:6969/admin/announcement', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`

        },
        body: JSON.stringify({title:title,content:content,createdBy:id})
      }).then((response) =>{
      return response.json();
      }).then(data => {
        console.log(data)
        setTitle("")
        setContent("")
        setRefresh(!refresh)
      });
  }
  const handleDelete = async (e,id) => {
    e.preventDefault();
    await fetch(`http://localhost:6969/admin/deleteAnnouncement/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `${token}`
      }
        })
        .then((response) => response.json())
        .then((data)=>{
          if(data.result === "Success"){
            
            setRefresh(!refresh)
          }
        })

  }
  
    useEffect( () => {

      fetch('http://localhost:6969/admin/getannouncements')
      .then((response) =>{
        return response.json()
      })
      .then(data =>{
        console.log(data)
        setAnnouncementList(data)
      })

    },[refresh])

    

  return (
    <div>
        <div className ="table-container-announcement">
            <label>Title</label>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
            <label>Content</label>
            <input type="textArea" value={content} onChange={e=>setContent(e.target.value)} />
            <button onClick={handleAnnouncement }>Announce</button>
        </div>
        <div>
          <h4 className="center">Announcements</h4>
          {announcementList.map((announcement,key) => ( 
            
            <div className="table-container-announcement">
            <h4>{announcement.title}</h4>
            <div className="content">{announcement.content}</div>
            <button onClick={(e) => handleDelete(e,announcement._id)}>Delete</button>
            </div>
          ))}
        </div>
        
      
    </div>
  )
};

export default Announcements;
