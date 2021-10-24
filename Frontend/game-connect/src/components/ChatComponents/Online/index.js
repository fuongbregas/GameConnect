import './OnlineElements.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Online = ({onlineUsers, currentUser, setCurrentChat}) => {
    
    const [onlineFriends, setOnlineFriends] = useState([]);
    
    useEffect(() => {
        setOnlineFriends(onlineUsers);
    }, [onlineUsers]);
    //console.log('onlineFriends', onlineFriends);

    const setConversation = async (user) => {
        try {
            console.log("User", user);
            console.log("current", currentUser);
            const res = await axios.get('backend/conversations/get_one_conversation/' + currentUser + '/' + user);
            setCurrentChat(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="online">
            {
                onlineUsers.length !== 0 ?
                    onlineFriends.map (each_online_friend => (
                        <div key = {each_online_friend._id} className="onlineFriend" onClick = {() => setConversation (each_online_friend.username)}>
                            <div className="onlineImageContainer">
                                <img className="onlineImage"
                                    src = {each_online_friend.profile_picture !== '' ? each_online_friend.profile_picture : '/avatar.png'} 
                                    alt = ''/>
                                <div className = "onlineIndicator"/>
                            </div>
                            <span className="onlineUsername">{each_online_friend.username}</span>
                        </div>
                    ))
                : null
            }
        </div>
    );
}

export default Online;