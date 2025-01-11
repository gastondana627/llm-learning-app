import React, {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const Canvas = () => {
    const { spaceId } = useParams();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [space, setSpace] = useState(null);
  const canvasRef = useRef(null);
    const navigate = useNavigate();
   const socket = useRef(null);
useEffect(() => {
    fetchSpace()

  socket.current = io('http://localhost:5000');
  socket.current.on('chat message', (message) => {
       setMessages((prevMessages) => [...prevMessages, message]);
  })

    return () => {
      socket.current.disconnect();
    };
}, []);

    const fetchSpace = async () => {
      try {
       const response = await axios.get(`http://localhost:5000/api/spaces/${spaceId}`)
        setSpace(response.data);
        const canvas = canvasRef.current;
         const ctx = canvas.getContext('2d');
       if(space && space.canvasJSON) {
           try {
             const canvasState = JSON.parse(space.canvasJSON);
             canvasState.forEach(item => {
               ctx.fillStyle = item.color;
              ctx.fillRect(item.x, item.y, 10, 10);
             })
           }
         catch(e){
            console.log("Failed to parse canvasJSON")
         }
       }
       } catch(err) {
          console.log("Error fetching space ", err)
      }
    }
const handleChatSubmit = async (event) => {
       event.preventDefault();
  const newMessage = {
     sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString()
  }
     socket.current.emit("chat message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setChatInput("");
  try {
   const response = await axios.post(`http://localhost:5000/api/activities`, {
       spaceId,
       activityType: 'chat',
      content: newMessage
   })
    console.log("Activity response", response)
  } catch(err) {
    console.log("Error sending activity", err)
  }

    };

const handleCanvasClick = (event) => {
   if(space) {
       const canvas = canvasRef.current;
       const ctx = canvas.getContext('2d');
       const rect = canvas.getBoundingClientRect();
       const x = event.clientX - rect.left;
       const y = event.clientY - rect.top;
        ctx.fillStyle = 'blue';
      ctx.fillRect(x, y, 10, 10);
       try {
          const canvasState = localStorage.getItem(`canvasState-${spaceId}`)
          let parsedState = canvasState ? JSON.parse(canvasState) : []
        localStorage.setItem(`canvasState-${spaceId}`, JSON.stringify([...parsedState, {x, y, color: 'blue'}]));
          }
         catch(e) {
             console.log("Error setting canvas state to storage", e)
         }
     try{
          const response = await axios.put(`http://localhost:5000/api/spaces/${spaceId}`, {
          canvasJSON: localStorage.getItem(`canvasState-${spaceId}`)
          })
          console.log("response from update ", response);
      } catch(err) {
        console.log("Error updating space ", err);
      }
   }

 };
    const handleDashboardNav = () => {
      navigate("/dashboard");
    }

    return (
    <div>
       <button onClick={handleDashboardNav}>Go To Dashboard</button>
            <h1>{space ? space.spaceName : "Loading..."} Canvas</h1>
        <div style={{ display: "flex"}}>
            <canvas ref={canvasRef} width={500} height={400}
                    style={{ border: '1px solid black', marginRight: '20px' }}
                onClick={handleCanvasClick}
            />
        <div style={{ border: "1px solid black", padding: "10px", width: "300px"}}>
             <h2>Chat</h2>
            <div style={{height: '300px', overflowY: "scroll"}}>
             {messages.map((message, index) => (
              <div key={index}>
                  <p><b>{message.sender}</b>: {message.text} {message.timestamp}</p>
               </div>
             ))}
           </div>
               <form onSubmit={handleChatSubmit}>
                 <input
                   type="text"
                    value={chatInput}
                    placeholder="Enter message"
                   onChange={(event) => setChatInput(event.target.value)}
                 />
                 <button type="submit">Send</button>
            </form>
         </div>
        </div>
    </div>
    );
}

export default Canvas;