import './ProfileElements.css';
import ProfilePicture from '../../ProfileComponents/ProfilePicture/ProfilePicture';
import ProfileTabs from '../../ProfileComponents/ProfileTabs/ProfileTabs';
import RequestButton from '../../ProfileComponents/FriendRequestButtons/RequestButton';
import {ProfileImageChanger} from '../../../components';
import axios from 'axios';
import {React, useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router';
import {AuthContext} from '../../../context/AuthContext';

const Profile = () => {
    const {user} = useContext(AuthContext);
    const {username} = useParams();

    const [profilePicture, setProfilePicture] = useState('');
    const [screen, changeScreen] = useState(false);

    const getProfilePicture = async () => {
        try {
            const res = await axios.get('/backend/users?username=' + username);
            setProfilePicture(res.data.profile_picture);
            
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProfilePicture();
    }, [username]);

    return (
        <>
            {
                screen === false ? 
                <div className="profileContainer">
                    <ProfilePicture username = {username} profilePicture = {profilePicture} changeScreen={changeScreen}/>
                    <RequestButton username = {username}/>
                    <div className="bottom">
                        <ProfileTabs username = {username}/>
                    </div>
                </div>
                : <ProfileImageChanger setProfilePicture={setProfilePicture} changeScreen={changeScreen}/>
            }
        </>
        
    );
}

export default Profile;

