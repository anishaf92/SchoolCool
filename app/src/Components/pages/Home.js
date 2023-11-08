import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
  
    
  return (
    <div >
      <div className="content">
      <h2 className="section-heading">About Kinabalu International School</h2>
      <p>
        Today Kinabalu International School has over 470 students from over 33 nationalities and follows the National Curriculum Programme of Study for England and Wales. It is the oldest international school in Sabah with a well-deserved reputation for delivering a high-quality education programme for over 40 years.
      </p>

      <h2 className="section-heading">History and Establishment</h2>
      <p>
        The school was originally established in the 1970’s to provide a British-type education for children of expatriates living and working in Sabah. Initially, premises were rented from the St John’s Ambulance Association in Kota Kinabalu and the first teachers were parents of the students attending the school. However, the school quickly introduced its current policy of recruiting only the best qualified teachers from around the world and began to receive recognition of its commitment to high standards from local, regional, and global educational organizations.
      </p>

      <h2 className="section-heading">Partnering with British-Style Schools Throughout Asia</h2>
      <p>
        In 1988, KIS became a founder member of the Federation of British International Schools in Asia (FOBISIA), a prestigious organization of British-style schools formed to support shared goals and expectations and promote educational excellence in its member schools. Even today, KIS continues to play a central role in the Federation with our staff attending and leading FOBISIA committees, workshops, and conferences, spreading good practice throughout South East Asia.
      </p>

      <button onClick={(e) => navigate("/")}>Back</button>
    </div>
    </div>
  )
};

export default Home;
