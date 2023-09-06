import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import helper from "../helper";

export default function ProfilePicture(props) {
  const navigate = useNavigate();
  const [Image, useImage] = useState({ preview: "", data: "" });

  const ProfilePicture = async (e) => {
    e.preventDefault();
    if (props.status === "Create") {
      helper.ProfilePicture(Image);
      /** */
      navigateUserPage();
      /** */
    } else {
      let ImageName = `${sessionStorage.getItem('UserId')}.JPG`;
      if (await helper.DeleteProfilePicture(ImageName) == "OK")
      {
        await helper.ProfilePicture(Image);
      } 
    }
  };

  /** */
  const navigateUserPage = () => {
    navigate("/userPage");
  };
  /** */

  const HandleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    useImage(img);
  };
  return (
    <div className="App">
      <h1>Upload to server profile picture</h1>
      {Image.preview && <img src={Image.preview} width="100" height="100" />}
      <hr></hr>
      <form>
        <input type="file" name="file" onChange={HandleFileChange}></input>
        <button type="submit" name="Profile_Picture" onClick={ProfilePicture}>
          {props.status} Profile Picture
        </button>
        <button
          style={{ display: props.status === "Create" ? "block" : "none" }}
          /** */
          onClick={navigateUserPage}
          /** */
        >
          no thanks i dont want to create profile picture
        </button>
      </form>
    </div>
  );
}
