import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/homePage';
import AdminPage from './components/Users/adminPage';
import SignInPage from './components/SignInUp/signInPage';
import SignUpPage from './components/SignInUp/signUpPage';
import UserPage from './components/Users/userPage';
import LandingPage from './components/landingPage';
import FriendPage from './components/Users/friendPage';


export default function App()
{
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/:name/homePage" element={<HomePage />} />
                <Route path="/adminPage" element={<AdminPage />}/>
                <Route path="/signInPage" element={<SignInPage />} />
                <Route path="/signUpPage" element={<SignUpPage />} />
                <Route path="/userPage" element={<UserPage />}/>
                <Route path="/friendPage" element={<FriendPage />}/>
            </Routes>
        </BrowserRouter> );
}
