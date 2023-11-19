import React from 'react';
import {
    useNavigate
} from "react-router-dom";
import DesignSignInUp from './designSignInUp';

export default function SignInPage() {
    const navigate = useNavigate();

    const HandleSubmit = async (UserName, Password, NickName, IsPrivate) => {
        debugger;
        let user = { UserName: UserName, NickName: NickName, Password: Password};
        if (UserName === "admin" && NickName === "myProject" && Password === "123456789") {
            sessionStorage.setItem('UserId', 0);
            navigate('/adminPage');
        }
        else {
            const responseSignIn = await fetch('http://localhost:1234/api/signInUp/signIn', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const dataRes = await responseSignIn.json();
            if (dataRes.UserId != 'false') {
                if (typeof dataRes.UserId != "number") {
                    alert(dataRes.UserId);
                }
                else {
                    sessionStorage.setItem("UserId", dataRes);
                    /** */
                    navigate('/userPage');
                    /** */
                }
            } else {
                alert("ERROR in sign-in");
            }
        }
    }
    return (<div>
        <h1>Sign-in-page</h1>
        <DesignSignInUp SignInUp={HandleSubmit} Display={"none"}/>
    </div>)
}

