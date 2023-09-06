import React, { useState } from "react";
import helper from '../helper';

export default function UserMessages() {
  const [Messages, setMessages] = useState([{ Message: "", CodeMessage: 0 }]);
  const [Display, setDisplay] = useState("none");

  const ServeMessages = async () => {
    const responseMessages = await fetch(
      `http://localhost:1234/api/messages/serveMessages/${sessionStorage.getItem(
        "UserId"
      )}`
    );
    const Messages = await responseMessages.json();
    setMessages([...Messages]);
  };

  const AddToMyFriendList = async (FriendId, CodeMessage) => {
    let AddFriend = {
      UserId: sessionStorage.getItem("UserId"),
      FriendId: FriendId,
    };
    helper.addFriendToMyFriendsList(AddFriend);
    DeleteMessage(CodeMessage);
  };

  const DeleteMessage = async (CodeMessage) => {
    const responseDeleteMessage = await fetch(
      `http://localhost:1234/api/messages/DeleteMessage/${CodeMessage}`);
    if (responseDeleteMessage.statusText == "OK") ServeMessages();
  };

  return (
    <div>
      <button onClick={ServeMessages}>My-message</button>
      {Messages.map((message) => (
        <div>
          <label>{message.Message}</label>
          <button style={{ display: message.BodyMessage != null ? "block" : "none" }} onClick={() => AddToMyFriendList(message.BodyMessage, message.CodeMessage)}>add to my friend</button>
          <button style={{ display: Display }} onClick={() => DeleteMessage(message.CodeMessage)}>ignore</button>
        </div>
      ))}
    </div>
  );
}
