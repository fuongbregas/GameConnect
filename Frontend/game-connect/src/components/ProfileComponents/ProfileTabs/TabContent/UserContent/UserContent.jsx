import {React} from 'react';
import { useHistory } from 'react-router';
import './UserContent.css';

const UserContent = ({data}) => {
    const history = useHistory();
    const handleClick = (username) => {
        history.push(`/profile/${username}`);
    }
    
    return (
        <>
            {
                data.map((each_data, index) => (
                    <div key = {index} className = 'user' onClick={() => handleClick(each_data.username)}>
                        <img className = 'profile-picture' 
                             src = {each_data.profile_picture !== '' ? each_data.profile_picture : '/avatar.png'}
                             alt = ''
                             referrerPolicy="no-referrer"/>
                        <h2 className = 'username'>{each_data.username}</h2>
                    </div>
            ))}
        </>
    );
}

export default UserContent;