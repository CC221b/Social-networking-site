import React from 'react';
import {
    useNavigate
} from "react-router-dom";
import DesignSignInUp from './designSignInUp';

export default function SignUpPage() {
    const navigate = useNavigate();

    const HandleSubmit = (UserName, Password, NickName) => {
        if (UserName==="chani&milca" && NickName==="myProject" && Password==="123456789") {
            navigate('/adminPage');
        } else {
            alert("user name or password are worng!");
        }
    }

    return (<div>
        <h1>Admin-sign-in-page</h1>
        <DesignSignInUp SignInUp={HandleSubmit} />
    </div>)
}