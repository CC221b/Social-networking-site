import React, { useState, useEffect } from "react";
import helper from "../helper";

export default function AdminSearchPage() {
  const [UserName, setUserName] = useState("");
  const [Users, setUsers] = useState([{ UserName: "" }]);
  const [Page, setPage] = useState(1);
  const [UserAlbum, setUserAlbum] = useState([{ Path: "" }]);
  const [Display, setDisplay] = useState("none");

  useEffect(() => {
    ServeUsers();
  }, []);

  const Search = async (e) => {
    if (e.key === "Enter") {
      await setUserName(e.target.value);
      ServeAlbum(1, e.target.value);
      e.target.value = null;
    }
  };

  const ServeAlbum = async (page = 1, UserName) => {
    await setPage(page);
    let Album = await helper.ServeAlbumWithUserName(page, UserName);
    setUserAlbum([...Album]);
    setDisplay("block");
  };

  const ServeUsers = async () => {
    let Users =await helper.ServeUsers();
    setUsers(Users);
  };

  return (
    <div>
      <label>Search User:</label>
      <input list="Users" name="Users" id="input" placeholder="Start searching" onKeyDown={(e) => Search(e)}/>
      <datalist id="Users">
        {Users.map((User) => (
          <option key={User.UserId} value={User.UserName}>{User.UserName}</option>
        ))}
      </datalist>
      <br></br>
      {UserAlbum.map((image) => (
        <img src={image.Path} style={{ width: "80px" }}/>
      ))}
      <button onClick={() => ServeAlbum(Page + 1, UserName)} style={{ display: Display }}>
        Upload more images
      </button>
    </div>
  );
}
