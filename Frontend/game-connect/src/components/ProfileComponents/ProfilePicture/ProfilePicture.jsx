import {React, useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ProfilePicture.css';
import {AuthContext} from '../../../context/AuthContext';
const ProfilePicture = ({username, profilePicture, changeScreen}) => {
    const {user} = useContext(AuthContext);

    const handleClick = () => {
        if (user === username) {
            changeScreen(true);
        }
    }

    return (
        <div className = 'profile_picture_container'>
            <img    className = 'profile_picture' 
                    src = {profilePicture !== '' ? profilePicture : '/avatar.png'} 
                    alt = ''
                    onClick={handleClick}
                    referrerPolicy="no-referrer"
            />
            <h2 className = 'userName'>{username}</h2>
        </div>
    );
}

export default ProfilePicture;