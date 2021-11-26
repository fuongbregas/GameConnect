import {React, useContext} from 'react';
import './AcceptRequest.css';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext';

const AcceptRequest = ({username, setFriendStatus}) => {
    const {user} = useContext(AuthContext);
    const handleClick = async (event) => {
        event.preventDefault();
        const data = {
            user: user,
            username: username,
        };
        try {
            const res = await axios.put('/backend/users/friends/acceptable', data);
            setFriendStatus(res.data);            
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="accept_friend" onClick={handleClick}>Accept Friend Request</button>
    );
}

export default AcceptRequest;