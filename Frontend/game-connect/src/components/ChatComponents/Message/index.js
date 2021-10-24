import './MessageElements.css';
import {format} from 'timeago.js';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Message = ({message, own, sender}) => {
    //console.log("sender", sender);
    const [profilePicture, setProfilePicture] = useState('');
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getProfilePicture = async () => {
            try {
                const res = await axios.get('backend/users?username=' + sender, {
                    cancelToken: source.token,
                });
                setProfilePicture(res.data.profile_picture);
            }
            catch (error) {
                if (axios.isCancel(error)){

                } else {
                    console.log(error);
                }
            }
        }

        getProfilePicture();

        return () => {
            source.cancel();
        }
    }, [sender]);

    return (
        
        <div className = {own ? 'message own' : 'message'}>
            <div className = 'messageTop'>
                <img className = 'messageImage'
                    src = {profilePicture !== '' ? profilePicture : '/avatar.png'}
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