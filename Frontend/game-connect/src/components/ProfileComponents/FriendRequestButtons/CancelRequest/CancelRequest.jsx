import {React, useContext} from 'react';
import './CancelRequest.css';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext';

const CancelRequest = ({username, setFriendStatus}) => {
    const {user} = useContext(AuthContext);
    const handleClick = async (event) => {
        event.preventDefault();
        const data = {
            user: user,
            username: username,
        };
        try {
            const res = await axios.put('/backend/users/friends/remove_pending', data);
            setFriendStatus("Nothing");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className = 'cancel_friend' onClick={handleClick}>Cancel Friend Request</button>
    );
}

export default CancelRequest;
