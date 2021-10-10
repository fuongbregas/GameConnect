import './OnlineElements.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Online = ({onlineUsers, currentUser, setCurrentChat}) => {
    //const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    /*
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get('/backend/users/friends/' + currentUser);
            setFriends(res.data);
            
        }
        getFriends();
    }, [currentUser]);
    */

    useEffect(() => {
        setOnlineFriends(onlineUsers);
    }, [onlineUsers]);
    //console.log('onlineFriends', onlineFriends);

    return(
        <div className="online">
            {onlineFriends.map (each_online_friend => (
                <div key = {each_online_friend._id} className="onlineFriend">
                    <div className="onlineImageContainer">
                        <img className="onlineImage"
                            src = {each_online_friend.profile_picture} 
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