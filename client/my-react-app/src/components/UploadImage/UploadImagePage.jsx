import React from "react";
import { useState } from "react";

export default function UserUploadImagePage(props) {
  const [Image, useImage] = useState({ preview: "", data: "" });
  const [ImageName, useImageName] = useState("");

  const UploadImage = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("AlbumId", sessionStorage.getItem("UserId"));
    formData.append("file", Image.data);
    formData.append("ImageName", ImageName);
    const resFormData = await fetch(
      "http://localhost:1234/api/uploadImage/InsertToFolder",
      {
        method: "POST",
        body: formData,
      }
    );
    if (resFormData.statusText == "OK"){
      props.Followers.map(async (follower) =>{
        const responseMessage = await fetch(
          `http://localhost:1234/api/messages/FriendUploadImage/${sessionStorage.getItem('UserId')}/${follower.UserId}`
        );
      });
    }
  };

  const HandleFileChange = (e) => {
    useImageName(e.target.files[0].name);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    useImage(img);
  };

  return (
    <div className="App">
      <h1>Upload to server</h1>
      {Image.preview && <img src={Image.preview} width="100" height="100" />}
      <hr></hr>
      <form onSubmit={UploadImage}>
        <input type="file" name="file" onChange={HandleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
