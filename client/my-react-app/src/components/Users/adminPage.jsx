import React from "react";
import SignOut from "../signOut";
import AdminSearchPage from "./adminSearchPage";
import AdminBlockUser from "./adminBlockUser";
import { useNavigate } from "react-router-dom";
import Album from "../adminAlbum";
import AdminMessages from "../Users/adminMessage";

export default function AdminPage() {
  const navigate = useNavigate();
  
  const navigateHomePage = () => {
    navigate("/homePage");
  };

  return (
    <div>
      <h1>admin-page</h1>
      <button onClick={navigateHomePage}>home-page</button>
      <SignOut />
      <AdminBlockUser />
      <Album />
      <AdminSearchPage />
      <AdminMessages/>
    </div>
  );
}
