import {React, useContext, useEffect, useState} from 'react';
import './RequestButton';
import axios from 'axios';
import AddFriend from './AddFriend/AddFriend';
import CancelRequest from './CancelRequest/CancelRequest';
import DeleteFriend from './DeleteFriend/DeleteFriend';
import AcceptRequest from './AcceptRequest/AcceptRequest';
import {AuthContext} from '../../../context/AuthContext';

const RequestButton = ({username}) => {
    const {user} = useContext(AuthContext);
    const [friendStatus, setFriendStatus] = useState(null);

    useEffect (() => {
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
        if (user !== null) {
            checkFriendStatus();
        }
        
    }, [user, username])
    
    return (
        <div className= 'request_button_container'>
            {
                /* Hide all the buttons if looking at self profile */
                user !== username ?                 
                    <>
                        {
                            /* Check friendStatus */
                            friendStatus === "Friend" ? <DeleteFriend username = {username} setFriendStatus = {setFriendStatus}/>
                            : friendStatus === "Nothing" ? <AddFriend username = {username} setFriendStatus = {setFriendStatus}/>
                            : friendStatus === "Pending" ? <CancelRequest username = {username} setFriendStatus = {setFriendStatus}/>
                            /* If the logged in user see the friend request from the viewed user */
                            : friendStatus === "Acceptable" ?
                                <> 
                                    <AcceptRequest username = {username} setFriendStatus = {setFriendStatus}/>
                                    <CancelRequest username = {username} setFriendStatus = {setFriendStatus}/>
                                </>
                            : null /* if friendStatus is not fully loaded */
                        }                        
                    </>
                : null
            }
        </div>
    );
}

export default RequestButton;