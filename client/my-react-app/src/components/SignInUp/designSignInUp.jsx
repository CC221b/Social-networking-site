import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DesignSignInPage(props) {
  const navigate = useNavigate();
  const [UserName, useUserName] = useState();
  const [Password, usePassword] = useState();
  const [NickName, useNickName] = useState();
  const [IsPrivate, setIsPrivate] = useState("");

  const NavigateGoBack = () => {
    navigate("/");
  };

  const HandleChangeName = (event) => {
    useUserName(event.target.value);
  };

  const HandleChangePassword = (event) => {
    usePassword(event.target.value);
  };

  const HandleChangeNickName = (event) => {
    useNickName(event.target.value);
  };

  const HandleChangeIsPrivate = (event) => {
    setIsPrivate(event.target.value);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    props.SignInUp(UserName, Password, NickName, IsPrivate);
  };

  return (
    <div>
      <button onClick={NavigateGoBack}>go-back</button>
      <form onSubmit={HandleSubmit}>
        <label>
          Name:
          <input type="text" value={UserName} onChange={HandleChangeName} />
        </label>
        <label>
          NickName:
          <input type="text" value={NickName} onChange={HandleChangeNickName} />
        </label>
        <label>
          Password:
          <input
            type="Password"
            value={Password}
            onChange={HandleChangePassword}
          />
        </label>
        <label style={{ display: props.Display }}>
          IsPrivate:
          <select
            name="IsPrivate"
            id="IsPrivate"
            onChange={HandleChangeIsPrivate}
          >
            <option value=""></option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
