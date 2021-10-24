import {React, useState} from 'react';
import axios from 'axios';
import './ProfileImageChangerElements.css';
import ImageUploader from 'react-images-upload';

const ProfileImageChanger = () => {
    const [pictureUrl, setPictureUrl] = useState("");
    
    const onDrop = (picture) => {    
        // use the FileReader to decode de picture file that comes
        let reader = new FileReader();
        let url = reader.readAsDataURL(picture[0]); // for the first picture in this case
    
        reader.onloadend = (event) => {
          // the reader.result variable will have your url, in this case I set the pictureUrl state to that
          setPictureUrl(reader.result);
        };
    };

    const handleClick = async (event) => {
        event.preventDefault();
        console.log(process.env.Imgur_ClientID);
        const clientID = "Client-ID " + "692d383f47dc3d5";
        console.log(clientID);
        const url = 'https://api.imgur.com/3/upload';

        let config = {
            headers : {
                Authorization: clientID,
                'Access-Control-Allow-Origin':'*',
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
        }
        
        const data = new FormData();
        data.append("image", pictureUrl);

        try {
            const res = await axios.post(url, data, config);
            console.log(res.data.link);
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
