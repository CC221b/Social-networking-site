import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const navigate = useNavigate();
  const [Friends, SetFriends] = useState([{ UserName: "" }]);

  useEffect(() => {
    UserFriendsList();
  }, []);

  const UserFriendsList = async () => {
    const ResponseFriendsList = await fetch(
      `http://localhost:1234/api/friendsList/${sessionStorage.getItem("UserId")}`
    );
    const ResponseFriendsListJson = await ResponseFriendsList.json();
    SetFriends([...ResponseFriendsListJson]);
  };

  const GoToFriendPage = async (FriendId) => {
    navigate("/friendPage", { state: { FriendId: FriendId } });
  };

  return (
    <div>
      <p>:רשימת האנשים שאני עוקב אחריהם </p>
      <ul>
        {Friends.map((Friends) => (
          <li onClick={() => GoToFriendPage(Friends.UserId)}>
            {Friends.UserName}
          </li>
        ))}
      </ul>
    </div>
  );
}
