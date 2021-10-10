import axios from 'axios';
import './ConversationElements.css';
import avatar from './avatar.png'
import {useEffect, useState, /*useContext*/} from 'react';
//import {AuthContext} from '../../../context/AuthContext';

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null);
    const [username, setUserName] = useState(null);
    //const {main_user} = useContext(AuthContext);
    
    useEffect(() => {
        const friend_username = conversation.users[1];
        
        const getUser = async () => {
            try {
                const res = await axios.get('backend/users?username=' + friend_username);
                setUser(res.data);
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
                src={avatar}
                alt=''
           />
           <span className="conversationName">
               {username}
            </span>
           
       </div>
    );
}

export default Conversation;