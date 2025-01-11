import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext'

const Dashboard = () => {
const [spaces, setSpaces] = useState([]);
    const {user, logout, isAuthenticated, loading} = useContext(AuthContext)
const navigate = useNavigate();

useEffect(() => {
   fetchSpaces()
}, []);
const fetchSpaces = async () => {
try {
   const response = await axios.get(`http://localhost:5000/api/spaces`)
     setSpaces(response.data);
} catch (err) {
   console.log("Error getting spaces: ", err)
}
}
const handleLogout = () => {
logout();
}
    const navigateToCanvas = (spaceId) => {
       navigate(`/canvas/${spaceId}`);
   };
if(!isAuthenticated) {
    navigate("/login");
    return null;
}
    if(loading) {
    return <div>Loading...</div>
    }
  const isTeacher = user && user.role === "teacher"
const renderSpaceList = () => {
    return spaces.map((space) => (
         <div
           key={space._id}
           style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
         >
          <h3 style={{cursor: "pointer"}} onClick={() => navigateToCanvas(space._id)}>{space.spaceName}</h3>
           <p>{space.description}</p>
         </div>
       ));
}

    return (
      <div>
       {isTeacher && (
         <button
         onClick={() => {}}
         >Create New Space</button>
        )}
        <h1>Welcome, {user.userName}!</h1>
        <h2>Your Spaces</h2>
        {spaces.length > 0 ? (
           <>{renderSpaceList()}</>
        ) : (
          <p>You have not joined any spaces yet.</p>
         )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}

export default Dashboard