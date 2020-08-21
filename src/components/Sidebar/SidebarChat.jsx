import React, { useEffect, useState } from "react";

import { Avatar } from "@material-ui/core";
// import useRandomSeed from "../../useRandomSeed";
import { Link } from "react-router-dom";

import db from "../../firebase";

import "./SidebarChat.css";

const SidebarChat = ({ addNewChat, name, id }) => {
  // const seed = useRandomSeed();
  const [messages, setMessages] = useState([]);
  const createNewChat = () => {
    const roomName = prompt("Enter name for chat");
    if (roomName && roomName.trim) {
      db.collection("rooms").add({ name: roomName });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createNewChat}>
      <h3>Add new Chat</h3>
    </div>
  );
};

export default SidebarChat;
