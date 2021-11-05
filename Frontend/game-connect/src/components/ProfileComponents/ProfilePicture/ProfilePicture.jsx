import {React, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfilePicture.css';
import {AuthContext} from '../../../context/AuthContext';
const ProfilePicture = ({username}) => {
    const {user} = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState('');
    useEffect(() => {
        
        const getProfilePicture = async () => {
            try {
                const res = await axios.get('/backend/users?username=' + username);
                setProfilePicture(res.data.profile_picture);
                
            }
            catch (error) {
                console.error(error);
            }
        }

        getProfilePicture();
        
    }, [username]);

    console.log('URL', profilePicture);

    return (
        <div className = 'profile_picture_container'>
            
            <Link to = {`/profile_image`}
                style = {user === username ? null : {pointerEvents: 'none'}}
            >
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