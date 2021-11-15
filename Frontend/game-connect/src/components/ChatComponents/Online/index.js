import './OnlineElements.css';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';

const Online = ({onlineUsers, currentUser, setCurrentChat, setMessages, setPageNumber}) => {
    // Username
    const {user} = useContext(AuthContext);
    const [onlineFriends, setOnlineFriends] = useState([]);

    // Get friend list from backend   
    useEffect(() => {
        const source = axios.CancelToken.source();

        const getOnlineFriends = async (user) => {
            try {
                const res = await axios.get("backend/users/friends/" + user, {
                    cancelToken: source.token,
                });
                var friendList = res.data.filter((each_friend) => onlineUsers.some((each_socket_user) => each_socket_user.userName === each_friend.username))

                setOnlineFriends(friendList);
            }   
            catch (error) {
                if (axios.isCancel(error)){

                } else {
                    console.log(error);
                }
            }
        }

        getOnlineFriends(user);

        return () => {
            source.cancel();
        }
    }, [user, onlineUsers]);

    const setConversation = async (user) => {
        try {
            setPageNumber(1);
            const res = await axios.get('backend/conversations/get_one_conversation/' + currentUser + '/' + user);
            setCurrentChat(res.data);
            const res2 = await axios.get('backend/messages/' + res.data._id + '/1');
            setMessages(res2.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="online">
            {
                onlineFriends.length !== 0 ?
                    onlineFriends.map (each_online_friend => (
                        <div key = {each_online_friend._id} className="onlineFriend" onClick = {() => setConversation (each_online_friend.username)}>
                            <div className="onlineImageContainer">
                                <img className="onlineImage"
                                    src = {each_online_friend.profile_picture !== '' ? 
                                           each_online_friend.profile_picture 
                                           : '/avatar.png'} 
                                    alt = ''
                                    referrerPolicy="no-referrer"/>
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