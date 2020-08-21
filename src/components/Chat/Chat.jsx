import React, { useState, useEffect } from "react";

// import useRandomSeed from "../../useRandomSeed";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";

import db from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../context/StateContext";

import "./Chat.css";

const Chat = () => {
  // const seed = useRandomSeed();
  const [msg, setMsg] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  console.log(roomId);
  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name);
      });
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
  }, [roomId]);

  const sendMsg = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: msg,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMsg("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>description</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, i) => (
          <p key={i} className={`chat__message ${message.name === user.displayName && "chat__reciever"} `}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmotionIcon />
        <form>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            name="message"
            id="message"
            autoComplete="off"
          />
          <SendIcon />
          <button type="submit" onClick={sendMsg}></button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
