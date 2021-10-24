import {React} from 'react';
import './ProfileImageChangerElements.css';
import ImageUploader from 'react-images-upload';

const ProfileImageChanger = () => {
    return (
        <div className = 'profileImageChangerContaienr'>
            <ImageUploader singleImage={true} maxFileSize={5242880} imgExtension={['.jpg','.png']} label="Max file size: 5mb, accepted: JPG and PNG" withPreview={true}/>
            <button>Upload</button>
        </div>
    );
}

export default ProfileImageChanger;
