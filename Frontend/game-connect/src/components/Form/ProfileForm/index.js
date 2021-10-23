import './ProfileElements.css';
import ProfilePicture from '../../ProfileComponents/ProfilePicture/ProfilePicture';
import ProfileTabs from '../../ProfileComponents/ProfileTabs/ProfileTabs';

const Profile = () => {
    return (
        <div className="profileContainer">
            <ProfilePicture/>
            <ProfileTabs/>
        </div>
    );
}

export default Profile;

