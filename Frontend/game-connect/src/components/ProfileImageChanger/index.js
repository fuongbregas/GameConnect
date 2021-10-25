import {React, useState, useContext} from 'react';
import axios from 'axios';
import './ProfileImageChangerElements.css';
import ImageUploader from 'react-images-upload';
import {AuthContext} from '../../context/AuthContext';
const ProfileImageChanger = () => {
    // Username
    const {user} = useContext(AuthContext);
    const [pictureUrl, setPictureUrl] = useState("");
    var FormData = require('form-data');
    const onDrop = (picture) => {    
        // use the FileReader to decode de picture file that comes
        let reader = new FileReader();
        let url = reader.readAsDataURL(picture[0]);
        reader.onloadend = (event) => {
          setPictureUrl(reader.result.split(',')[1]);
          
        };
    };

    const handleClick = async (event) => {
        event.preventDefault();
        console.log(process.env.Imgur_ClientID);
        const clientID = "Client-ID " + "692d383f47dc3d5";
        //console.log(pictureUrl);
        
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
                const res = axios.put('/backend/users/new_profile_picture', data);
                console.log(res);
            });
            
        }

        catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className = 'profileImageChangerContaienr'>
            <ImageUploader singleImage={true} maxFileSize={5242880} imgExtension={['.jpg','.png']} label="Max file size: 5mb, accepted: JPG and PNG" withPreview={true} onChange={onDrop}/>
            <button onClick={handleClick}>Upload</button>
            <img src={pictureUrl} alt=''></img>
        </div>
    );
}

export default ProfileImageChanger;
