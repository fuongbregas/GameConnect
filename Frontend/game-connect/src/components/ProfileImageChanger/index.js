import {React, useState, useContext} from 'react';
import axios from 'axios';
import './ProfileImageChangerElements.css';
import ImageUploader from 'react-images-upload';
import {AuthContext} from '../../context/AuthContext';
const ProfileImageChanger = ({setProfilePicture, changeScreen}) => {
    // Username
    const {user} = useContext(AuthContext);
    const [pictureUrl, setPictureUrl] = useState("");
    const client_id = process.env.REACT_APP_Imgur_ClientID;
    const clientID = "Client-ID " + client_id;
    var FormData = require('form-data');
    
    const onDrop = (picture) => {    
        // use the FileReader to decode de picture file that comes
        let reader = new FileReader();
        if (picture.length > 0) {
            reader.readAsDataURL(picture[0]);
            reader.onloadend = (event) => {
                setPictureUrl(reader.result.split(',')[1]);
                
            };
        }
        else {
            setPictureUrl("");
        }
    };

    const goBack = () => {
        changeScreen(false);
    }

    const handleClick = async (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", clientID);

        var formdata = new FormData();
        formdata.append("image", pictureUrl);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        try {
            await fetch("https://api.imgur.com/3/image", requestOptions)
            .then(response => response.json())
            .then(result => {
                const link = result['data']['link'];
                const data = {
                    username : user,
                    profile_picture : link,
                }
                setProfilePicture(link);
                axios.put('/backend/users/new_profile_picture', data);
                
            }).then(changeScreen(false));
        }
        catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className = 'profileImageChangerContaienr'>
            <ImageUploader singleImage={true} maxFileSize={5242880} imgExtension={['.jpg','.png']} label="Max file size: 5mb, accepted: JPG and PNG" withPreview={true} onChange={onDrop}/>
            <button className = 'uploadButton'
                    onClick = {handleClick} 
                    disabled = {
                        pictureUrl === "" ? true : false
                    }>Upload
            </button>
            <button className = 'cancelButton'
                    onClick = {goBack}
                    >Cancel
            </button>
        </div>
    );
}

export default ProfileImageChanger;
