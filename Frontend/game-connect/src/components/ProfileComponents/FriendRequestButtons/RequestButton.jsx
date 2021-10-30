import {React, useContext, useEffect, useState} from 'react';
import './RequestButton';
import axios from 'axios';
import AddFriend from './AddFriend/AddFriend';
import CancelRequest from './CancelRequest/CancelRequest';
import DeleteFriend from './DeleteFriend/DeleteFriend';
import {AuthContext} from '../../../context/AuthContext';

const RequestButton = ({username}) => {
    const {user} = useContext(AuthContext);
    const [friendStatus, setFriendStatus] = useState(null);

    // Get friend status between two users
    const checkFriendStatus = async () => {
        try {
            const res = await axios.get('/backend/users/friends/' + user + '/' + username);
            setFriendStatus(res.data);
        }
        catch (error) {
            console.error(error);
        }        
    }

    useEffect (() => {
        checkFriendStatus();
    }, [username])
    
    return (
        <div className= 'request_button_container'>
            {
                user !== username ? 
                    <>
                        {
                            /* Check friendStatus */
                            friendStatus === "Friend" ? <DeleteFriend/>
                            : friendStatus === "Nothing" ? <AddFriend/>
                            : friendStatus === "Pending" ? <CancelRequest/>
                            : null /* if friendStatus is not fully loaded */
                        }                        
                    </>
                    
                : null
            }            
            
        </div>
    );
}

export default RequestButton;