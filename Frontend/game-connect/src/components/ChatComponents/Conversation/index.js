import axios from 'axios';
import './ConversationElements.css';
import {useEffect, useState, /*useContext*/} from 'react';
//import {AuthContext} from '../../../context/AuthContext';

const Conversation = ({conversation, currentUser}) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUserName] = useState(null);
    //const {main_user} = useContext(AuthContext);
    
    useEffect(() => {
        var friend_username = conversation.users.find((member) => member !== currentUser);
        // If the type is undefined, set to the current user
        if (typeof friend_username === 'undefined'){
            friend_username = currentUser;
        }
        
        const getUser = async () => {
            try {
                const res = await axios.get('backend/users?username=' + friend_username);
                setProfilePicture(res.data.profile_picture);
                setUserName(res.data.username);
            }
            catch (error) {
                console.log(error);
            }
        }
        // Call the function
        getUser();
    }, [conversation, currentUser]);
    
    return (
       <div className="conversation">
           <img
                className="conversationImage"
                src={profilePicture !== '' ? profilePicture : '/avatar.png'}
                alt=''
           />
           <span className="conversationName">
               {username}
            </span>
           
       </div>
    );
}

export default Conversation;