import React, { useState } from "react";

export default function AdminBlockUser() {
  const [UserName, setUserName] = useState();

  const HandleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const BlockingUser = async () => {
    const responseBlockUser = await fetch(
      `http://localhost:1234/api/admin/blockUser/${UserName}`
    );
    if (responseBlockUser.statusText == "OK")
      alert("Successfully blocked user");
  };

  return (
    <div>
      <form onSubmit={BlockingUser}>
        <label>
          UserName:
          <input type="text" value={UserName} onChange={HandleChangeUserName} />
        </label>
        <button>Blocking a user:</button>
      </form>
     </div>
  );
}
