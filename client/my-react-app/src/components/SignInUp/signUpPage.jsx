import React from "react";
import { useState } from "react";
import DesignSignInUp from "./designSignInUp";
import ProfilePicturePage from "../UploadImage/ProfilePicturePage";

export default function SignUpPage() {
  const [Display, setDisplay] = useState("none");

  const HandleSubmit = async (UserName, Password, NickName, IsPrivate) => {
    if (IsPrivate == "") {
      alert("Please complete whether the user is private or public....");
    } else {
      let user = {
        UserName: UserName,
        NickName: NickName,
        Password: Password,
        IsPrivate: IsPrivate,
      };
      if (
        UserName === "chani&milca" &&
        NickName === "myProject" &&
        Password === "123456789"
      ) {
        alert("ERROR in sign-up");
      } else {
        const responseSignUp = await fetch(
          "http://localhost:1234/api/signInUp/signUp",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        const dataRes = await responseSignUp.json();
        if (dataRes != "false") {
          sessionStorage.setItem("UserId", dataRes);
          setDisplay("block");
        } else {
          alert("ERROR in sign-up");
        }
      }
    }
  };

  return (
    <div>
      <h1>Sign-Up-page</h1>
      <DesignSignInUp SignInUp={HandleSubmit} Display={"block"} />
      <div style={{ display: Display }}>
        <ProfilePicturePage status="Create"/>
      </div>
    </div>
  );
}
