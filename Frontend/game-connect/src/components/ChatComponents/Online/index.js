import './OnlineElements.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Online = ({onlineUsers, currentUser, setCurrentChat}) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get('/backend/users/friends/' + currentUser);
            setFriends(res.data);
            
        }
        getFriends();
    }, [currentUser]);
    

    useEffect(() => {
        setOnlineFriends(friends.filter((each_friend) => onlineUsers.includes(each_friend.username)));
    }, [onlineUsers, friends]);
    console.log(onlineUsers);

    return(
        <div className="online">
            {onlineFriends.map (each_online_friend => (
                <div key = {each_online_friend._id} className="onlineFriend">
                    <div className="onlineImageContainer">
                        <img className="onlineImage"
                            src = 'https://www.jellykey.com/wp-content/uploads/jellykey-retro-tv-35-1536x1536.jpg' 
                            alt = ''/>
                        <div className = "onlineIndicator"/>
                    </div>
                    <span className="onlineUsername">{each_online_friend.username}</span>
                 </div>
            ))}
        </div>
    );
}

export default Online;