import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();

  const navigateSignOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return <button onClick={navigateSignOut}>sign-out</button>;
}
