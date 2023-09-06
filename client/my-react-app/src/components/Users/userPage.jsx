import React, {useState} from "react";
import SignOut from "../signOut";
import FriendsList from "./friendsList";
import UserMessage from './userMessage';
import UserAlbum from "../userAlbum";
import ProfilePicturePage from "../UploadImage/ProfilePicturePage"
import { useNavigate } from "react-router-dom";
import FollowersList from './followersList';

export default function UserPage() {
  const navigate = useNavigate();
  const [Followers, SetFollowers] = useState([{ NickName: "", UserId: "" }]);
    
  const navigateHomePage = () => {
    navigate("/homePage");
  };

  const GetFollowers = async (Followers) => {
    SetFollowers([...Followers]);
  };

  return (
    <div>
      <h1>user-page</h1>
      <label>my profile picture:</label>
      <img
        src={`http://localhost:1234/${sessionStorage.getItem("UserId")}.JPG`}
        style={{ width: "80px" }}/>
      <ProfilePicturePage status="Update"/>
      <br></br>
      <button onClick={navigateHomePage}>home-page</button>
      <SignOut />
      <UserAlbum Followers={Followers}/>
      <FriendsList />
      <UserMessage />
      <FollowersList GetFollowers={GetFollowers}/>
    </div>
  );
}
