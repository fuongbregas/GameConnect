import {React, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfilePicture.css';
import {AuthContext} from '../../../context/AuthContext';
const ProfilePicture = () => {
    // Username
    const {user} = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState('');
    useEffect(() => {
        
        const getProfilePicture = async () => {
            try {
                const res = await axios.get('backend/users?username=' + user);
                setProfilePicture(res.data.profile_picture);
                console.log('A');
                //window.location.reload();
            }
            catch (error) {
                console.error(error);
            }
        }

        getProfilePicture();
        
    }, [user]);

    console.log('URL', profilePicture);

    return (
        <div className = 'profile_picture_container'>
            <Link to = '/profile_image'>
                <img    className = 'profile_picture' 
                        src = {profilePicture !== '' ? profilePicture : './avatar.png'} 
                        alt = '' 
                        referrerPolicy="no-referrer"/>
            </Link>
            
            <h2>{user}</h2>
        </div>
    );
}

export default ProfilePicture;