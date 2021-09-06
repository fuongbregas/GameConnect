import axios from 'axios';
import './ConversationElements.css';
import {useEffect, useState,} from 'react';

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null);
    console.log("Current user " + currentUser);
    useEffect(() => {
        const friend_username = conversation.users.find((member) => member !== currentUser);
        
        const getUser = async () => {
            try {
                const res = await axios('backend/users?username=' + friend_username);
                console.log("Worked");
                console.log(res);
                setUser(res.data);
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
                src='https://www.jellykey.com/wp-content/uploads/jellykey-retro-tv-35-1536x1536.jpg'
                alt=''
           />
           <span className="conversationName">{user.username}</span>
       </div>
    );
}

export default Conversation;