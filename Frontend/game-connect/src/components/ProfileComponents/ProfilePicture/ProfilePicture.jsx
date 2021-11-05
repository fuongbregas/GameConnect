import {React, useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ProfilePicture.css';
import {AuthContext} from '../../../context/AuthContext';
const ProfilePicture = ({username, profilePicture}) => {
    const {user} = useContext(AuthContext);
    
    return (
        <div className = 'profile_picture_container'>
            <Link to = '/profile_image' style = {user !== username ? {pointerEvents: 'none'} : null}>
                <img    className = 'profile_picture' 
                        src = {profilePicture !== '' ? profilePicture : '/avatar.png'} 
                        alt = '' 
                        referrerPolicy="no-referrer"/>
            </Link>
            
            <h2 className = 'userName'>{username}</h2>
        </div>
    );
}

export default ProfilePicture;