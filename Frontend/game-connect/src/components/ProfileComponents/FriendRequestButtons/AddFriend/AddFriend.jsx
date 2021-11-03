import {React, useContext} from 'react';
import './AddFriend.css';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext';

const AddFriend = ({username, setFriendStatus}) => {
    const {user} = useContext(AuthContext);
    const handleClick = async (event) => {
        event.preventDefault();
        const data = {
            user: user,
            username: username,
        };
        try {
            const res = await axios.put('/backend/users/friends/add_pending', data);
            setFriendStatus(res.data);
            
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="add_friend" onClick={handleClick}>Add Friend</button>
    );
}

export default AddFriend;