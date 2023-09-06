import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignOut from "./signOut";

function PrivateAndPublicUsers(AllUsers, EnabledUsers) {
  for (let i = 0; i < AllUsers.length; i++) {
    for (let j = 0; j < EnabledUsers.length; j++) {
      if (AllUsers[i].UserId === EnabledUsers[j].UserId) {
        AllUsers[i].Disabled = false;
        break;
      }
      AllUsers[i].Disabled = true;
    }
  }
  return AllUsers;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [Users, setUsers] = useState([
    { UserId: 0, NickName: "", UserName: "" },
  ]);
  const [UsersToView, setUsersToView] = useState([
    { UserId: 0, NickName: "", UserName: "" },
  ]);

  useEffect(() => {
    ServeUsers();
  }, []);

  const ServeUsers = async () => {
    if (sessionStorage.getItem('UserId') === "Guest") {
      const responsePublicUsers = await fetch(
        `http://localhost:1234/api/serveData/servePublicUsers`);
      const PublicUsers = await responsePublicUsers.json();
      setUsersToView([...PublicUsers]); 
    } else if(sessionStorage.getItem('UserId') === "0"){
      const responseAllUsers = await fetch(
        `http://localhost:1234/api/serveData/serveAllUsers`);
        const AllUsers = await responseAllUsers.json();
        setUsersToView([...AllUsers]); 
    }else {
      const responseUsers = await fetch(
        `http://localhost:1234/api/serveData/serveUsers/${sessionStorage.getItem(
          "UserId"
        )}`
      );
      const Users = await responseUsers.json();
      setUsers([...Users.AllUsers]);
      let UsersReadyToView = await PrivateAndPublicUsers(
        Users.AllUsers,
        Users.EnabledUsers
      );
      setUsersToView([...UsersReadyToView]);
    }
  };

  const navigateUserPage = () => {
    navigate("/userPage");
  };

  const navigateFriendPage = (FriendId) => {
    navigate("/friendPage", { state: { FriendId: FriendId } });
  };

  const CheckWhetherPrivate = async (Disabled, FriendId) => {
    if (Disabled === true) {
      let IfSendMessage = window.confirm("You Want To Send Message: " + FriendId);
      if (IfSendMessage) {
        const responseMessage = await fetch(
          `http://localhost:1234/api/messages/addToFriendsList/${sessionStorage.getItem('UserId')}/${FriendId}`
        );
      }
    } else {
      navigateFriendPage(FriendId);
    }
  };

  const Search = async (e) => {
    if (e.key === "Enter") {
      const UserToView = Users.filter(
        (User) => User.UserName == e.target.value
      );
      await setUsersToView(UserToView);
      e.target.value = null;
    }
  };

  return (
    <div>
      <h1>home-page</h1>
      <div style={{display: sessionStorage.getItem("UserId")==="Guest" || sessionStorage.getItem("UserId")==="0"? "none":"block"}}>
        <button onClick={navigateUserPage}>user-page</button>
        <img
        src={`http://localhost:1234/${sessionStorage.getItem("UserId")}.JPG`}
        style={{ width: "80px" }}
        />
      </div>
      <SignOut />
      <br></br>
      <label>Search User:</label>
      <input
        list="Users"
        name="Users"
        id="input"
        placeholder="Start searching"
        onKeyDown={(e) => Search(e)}
      />
      <datalist id="Users">
        {Users.map((User) => (
          <option value={User.UserName}>{User.UserName}</option>
        ))}
      </datalist>
      {UsersToView.map((User) => (
        <form onClick={() => CheckWhetherPrivate(User.Disabled, User.UserId)}>
          <label>profile user:</label>
          <img
            src={`http://localhost:1234/${User.UserId}.JPG`}
            style={{ width: "80px" }}
          />
          <label>Nick Name:{User.NickName}</label>
        </form>
      ))}
    </div>
  );
}
