import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const navigateGuest = () => {
    sessionStorage.setItem("UserId", "Guest");
    navigate("/homePage");
  };

  const navigateSignIn = () => {
    navigate("/signInPage");
  };

  const navigateSignUp = () => {
    navigate("/signUpPage");
  };

  return (
    <div>
      <nav>
        <button onClick={navigateGuest}>כניסת אורח</button>
        <button onClick={navigateSignUp}>משתמש חדש</button>
        <button onClick={navigateSignIn}>משתמש קיים</button>
      </nav>
    </div>
  );
}
