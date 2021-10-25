import {React, useState, useContext} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './ProfileImageChangerElements.css';
import ImageUploader from 'react-images-upload';
import {AuthContext} from '../../context/AuthContext';
const ProfileImageChanger = () => {
    // Username
    const {user} = useContext(AuthContext);
    const [pictureUrl, setPictureUrl] = useState("");
    const history = useHistory();
    var FormData = require('form-data');
    
    const onDrop = (picture) => {    
        // use the FileReader to decode de picture file that comes
        let reader = new FileReader();
        if (picture.length > 0) {
            reader.readAsDataURL(picture[0]);
        }
        reader.onloadend = (event) => {
          setPictureUrl(reader.result.split(',')[1]);
          
        };
    };

    const handleClick = async (event) => {
        event.preventDefault();
        const client_id = process.env.Imgur_ClientID;
        const clientID = "Client-ID " + client_id;
        console.log(clientID);
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Client-ID 692d383f47dc3d5");

        var formdata = new FormData();
        formdata.append("image", pictureUrl);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        try {
            const res = await fetch("https://api.imgur.com/3/image", requestOptions)
            .then(response => response.json())
            .then(result => {
                const link = result['data']['link'];
                const data = {
                    username : user,
                    profile_picture : link,
                }
                axios.put('/backend/users/new_profile_picture', data);
                
            }).then(history.push('/profile'));
            
        }

        catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className = 'profileImageChangerContaienr'>
            <ImageUploader singleImage={true} maxFileSize={5242880} imgExtension={['.jpg','.png']} label="Max file size: 5mb, accepted: JPG and PNG" withPreview={true} onChange={onDrop}/>
            <button onClick={handleClick}>Upload</button>
            
        </div>
    );
}

export default ProfileImageChanger;
