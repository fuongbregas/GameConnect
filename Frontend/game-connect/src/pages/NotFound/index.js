import { React, useEffect, useState } from 'react';
import './NotFound.css';
export default function NotFound() {
  const [images, setImages] = useState([]);
  const client_id = process.env.REACT_APP_Imgur_ClientID;
  const url = "https://api.imgur.com/3/album/LQ2ER9B";

  useEffect(() => {
    const getImages = () => {
      const clientID = "Client-ID " + client_id;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", clientID);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          // Get each Imgur image object & store to imageArray
          var imageArray = (result['data']['images']);

          // Get each image URL
          var imageURLs = new Array();
          for (var i = 0; i < imageArray.length; i++) {
            imageURLs.push(imageArray[i]['link']);
          }
          
          // Set images with imageURLs
          setImages(imageURLs);
        })
        .catch(error => console.log('error', error));
    }
    getImages();

  }, [url]);
  
  console.log(images)

  return (
    <div className='notfound-bg'>
      <span className='message-404'>GameCannot 404</span>
      <span className='message-404'>¯\_(ツ)_/¯</span>
    </div>
  );
}