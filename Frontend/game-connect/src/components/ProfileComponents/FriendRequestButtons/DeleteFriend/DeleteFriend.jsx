import {React, useContext} from 'react';
import './DeleteFriend.css';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext';

const DeleteFriend = ({username, setFriendStatus}) => {
    const {user} = useContext(AuthContext);
    const handleClick = async (event) => {
        event.preventDefault();
        const data = {
            user: user,
            username: username,
        };
        try {
            const res = await axios.put('/backend/users/friends/unfriend', data);
            setFriendStatus(res.data);
            
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className = 'delete_friend' onClick = {handleClick}>Unfriend</button>
    );
}

export default DeleteFriend;
