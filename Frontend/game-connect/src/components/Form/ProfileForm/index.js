import './ProfileElements.css';
import ProfilePicture from '../../ProfileComponents/ProfilePicture/ProfilePicture';
import ProfileTabs from '../../ProfileComponents/ProfileTabs/ProfileTabs';
import RequestButton from '../../ProfileComponents/FriendRequestButtons/RequestButton';
import { useParams } from 'react-router';
const Profile = () => {
    const {username} = useParams();
    console.log('Username', username);
    return (
        <div className="profileContainer">
            <ProfilePicture username = {username}/>
            <RequestButton username = {username}/>
            <ProfileTabs/>
        </div>
    );
}

export default Profile;

