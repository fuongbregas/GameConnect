import './MessageElements.css';
import {format} from 'timeago.js';
import avatar from './avatar.png'
import {useState, useEffect} from 'react';
import axios from 'axios';

const Message = ({message, own, sender}) => {
    //console.log("sender", sender);
    const [profilePicture, setProfilePicture] = useState('');
    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const res = await axios.get('backend/users?username=' + sender);
                setProfilePicture(res.data.profile_picture);
            }
            catch (error) {
                console.error(error);
            }
        }

        getProfilePicture();
    }, [sender]);

    return (
        
        <div className = {own ? 'message own' : 'message'}>
            <div className = 'messageTop'>
                <img className = 'messageImage'
                    src = {profilePicture !== '' ? profilePicture : avatar}
                    alt = ''
                />
                <p className = 'messageText'>
                    {message.message_content}
                </p>
            </div>

            <div className = 'messageBottom'>
                {format(message.createdAt)}
            </div>
        </div>
        
    );
}

export default Message;