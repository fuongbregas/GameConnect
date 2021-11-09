import {React} from 'react';
import { useHistory } from 'react-router';
import './FriendContent.css';

const FriendContent = ({data}) => {
    const history = useHistory();
    const handleClick = (username) => {
        history.push(`/profile/${username}`);
    }
    
    return (
        <>
            {
                data.map((each_data, index) => (
                    <div key = {index} className = 'friend' onClick={() => handleClick(each_data.username)}>
                        <img className = 'profile-picture' 
                             src = {each_data.profile_picture} 
                             alt = ''
                             referrerPolicy="no-referrer"/>
                        <h2 className = 'username'>{each_data.username}</h2>
                    </div>
            ))}
        </>
    );
}

export default FriendContent;