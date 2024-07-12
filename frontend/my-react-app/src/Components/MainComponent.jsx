import React, { useState, useEffect } from "react";
import "../MainComponent.css"; // Assuming styles are defined in styles.css

const MainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatBoxes, setChatBoxes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the backend using Fetch API
    fetch("http://localhost:5000/api/users", {
      credentials: "include", // Include credentials (cookies)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setChatBoxes(data);
        } else {
          throw new Error("Data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredChats = chatBoxes.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          {/* Search container */}
          <div className="search-container">
            <div className="input">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search or start new chat"
                onChange={handleSearchChange}
                style={{ color: "black" }}
              />
            </div>
          </div>

          {/* Buttons above chat list */}
          <div className="button-container">
            <button className="small-button">Add new group</button>
            <button className="small-button">Send broadcast</button>
          </div>

          {/* Chats */}
          <div className="chat-list">
            {filteredChats.map((chat, index) => (
              <div key={index} className="chat-box">
                <div className="img-box">
                  <img
                    className="img-cover"
                    src="https://via.placeholder.com/45"
                    alt=""
                  />
                </div>
                <div className="chat-details">
                  <div className="text-head">
                    <h4>{chat.name}</h4>
                    <p className="time unread">{chat.time}</p>
                  </div>
                  <div className="text-message">
                    <p>{chat.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right container */}
        <div className="right-container">
          {/* Chat container */}
          <div className="chat-container">
            <div className="message-box my-message">
              <p>
                I have been waiting to see that show asap!
                <br />
                <span>07:43</span>
              </p>
            </div>
            {/* Add more message-box elements as needed */}
          </div>

          {/* Input bottom */}
          <div className="chatbox-input">
            <i className="fa-regular fa-face-grin"></i>
            <i className="fa-sharp fa-solid fa-paperclip"></i>
            <input type="text" placeholder="Type a message" />
            <i className="fa-solid fa-microphone"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
