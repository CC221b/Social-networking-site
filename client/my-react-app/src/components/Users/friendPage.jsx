import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignOut from "../signOut";
import helper from "../helper";
import FriendAlbum from "../friendAlbum";

export default function FriendPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { FriendId } = state;

  const addFriendToMyFriendsList = async () => {
    let AddFriend = {
      UserId: sessionStorage.getItem("UserId"),
      FriendId: FriendId,
    };
    helper.addFriendToMyFriendsList(AddFriend);
  };

  const removeFriendToMyFriendsList = async () => {
    let RemoveFriend = {
      UserId: sessionStorage.getItem("UserId"),
      FriendId: FriendId,
    };
    const responseRemoveFriend = await fetch(
      "http://localhost:1234/api/friendsList/removeAFriend",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RemoveFriend),
      }
    );
    if (responseRemoveFriend.statusText == "OK") alert("deleted");
  };

  const existInTheFriendsList = async () => {
    const responseExistFriend = await fetch(
      `http://localhost:1234/api/friendsList/${sessionStorage.getItem("UserId")}/${FriendId}`
    );
    const theExtractingAnswer = await responseExistFriend.json();
    return (theExtractingAnswer);
  }

  const navigateHomePage = () => {
    navigate("/homePage");
  };

  return (
    <div>
      <h1>friend-page</h1>
      <button onClick={navigateHomePage}>home-page</button>
      <button style={{display: sessionStorage.getItem("UserId")==="Guest" || sessionStorage.getItem("UserId")==="0"? "none":"block"}} onClick={addFriendToMyFriendsList}>add to friend list</button>
      <button style={{display: sessionStorage.getItem("UserId")==="Guest" || sessionStorage.getItem("UserId")==="0"? "none":"block"}} onClick={removeFriendToMyFriendsList}>remove from friend list</button>
      <SignOut />
      <FriendAlbum FriendId={FriendId}/>
    </div>
  );
}
