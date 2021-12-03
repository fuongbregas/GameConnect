import './ProfileElements.css';
import ProfilePicture from '../../ProfileComponents/ProfilePicture/ProfilePicture';
import ProfileTabs from '../../ProfileComponents/ProfileTabs/ProfileTabs';
import RequestButton from '../../ProfileComponents/FriendRequestButtons/RequestButton';
import {ProfileImageChanger} from '../../../components';
import axios from 'axios';
import {React, useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router';

const Profile = () => {
    const history = useHistory();
    const {username} = useParams();

    const [profilePicture, setProfilePicture] = useState('');
    const [screen, changeScreen] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getProfilePicture = async () => {
            try {
                const res = await axios.get('/backend/users?username=' + username, {
                    cancelToken: source.token,
                });
                setProfilePicture(res.data.profile_picture);
                
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    history.push('/profile');
                }
            }
        }

        getProfilePicture();
        return () => {
            source.cancel();
        }
    }, [history, username]);

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

