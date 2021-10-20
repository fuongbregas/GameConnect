import {React, useState, useContext, useEffect} from 'react';
import axios from 'axios';
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
            }
            catch (error) {
                console.error(error);
            }
        }

        getProfilePicture();
    }, [user]);
    
    return (
        <div className = 'profile_picture_container'>
            <img className = 'profile_picture' src = {profilePicture !== '' ? profilePicture : './avatar.png'} alt = ''/>
            <h2>{user}</h2>
        </div>
    );
}

export default ProfilePicture;