import React from "react";
import { useState, useEffect } from "react";

export default function FollowersList(props) {
    const [Followers, SetFollowers] = useState([{ UserName: "", UserId: "" }]);

    useEffect(() => {
        UserFollowersList();
    }, []);

    const UserFollowersList = async () => {
        const ResponseFollowersList = await fetch(
            `http://localhost:1234/api/followersList/${sessionStorage.getItem("UserId")}`
        );
        const ResponseFollowersListJson = await ResponseFollowersList.json();
        debugger;
        props.GetFollowers(ResponseFollowersListJson);
        SetFollowers([...ResponseFollowersListJson]);
    };

    const removeAFollower = async (FollowerId) => {
        const data = { FollowerId: FollowerId, UserId: sessionStorage.getItem("UserId")}
        const resRemoveAFollower = await fetch(
            "http://localhost:1234/api/followersList/removeAFollower",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if(resRemoveAFollower.statusText == "OK")  UserFollowersList();  
    };

    return (
        <div>
            <h1>עוקבים אחריך {Followers.length} אנשים</h1>
            <ul>
                {Followers.map((Followers) => (
                    <div>
                        <li >{Followers.UserName} </li>
                        <button onClick={() => {removeAFollower(Followers.UserId)}}>remove follower</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}
