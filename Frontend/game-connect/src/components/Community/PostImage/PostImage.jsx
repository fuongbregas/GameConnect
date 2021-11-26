import { React, useState, useEffect } from 'react';
import './PostImage.css';

const PostImage = ({ imageURL }) => {
    //const [url, setURL] = useState('');
    const [images, setImages] = useState([]);
    const client_id = process.env.REACT_APP_Imgur_ClientID;
    //const url = "https://api.imgur.com/3/album/LQ2ER9B";
    const openImageLink = (link) => {
        window.open(link, '_blank');
    }

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

            fetch(imageURL, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // Get each Imgur image object & store to imageArray
                    var imageArray = (result['data']['images']);

                    // Get each image URL
                    var imageURLs = [];
                    for (var i = 0; i < imageArray.length; i++) {
                        imageURLs.push(imageArray[i]['link']);
                    }

                    // Set images with imageURLs
                    setImages(imageURLs);
                })
                .catch(error => console.log('error', error));
        }
        if (imageURL !== '') {
            getImages();
        }
        
    }, [client_id, imageURL]);

    return (
        <>
            {
                images.length === 0 ? null :
                    <>
                        <span className="post-image-url" onClick={() => openImageLink(imageURL)}>{imageURL}</span>

                        <div className='post-image-container'>
                            {
                                images.map((each_image, index) => (
                                    <div key={index} className = 'div_to_hold_images'>
                                        <img className='post-image'
                                            src={each_image}
                                            alt=''
                                            referrerPolicy="no-referrer" />
                                    </div>
                                ))
                            }
                        </div>
                    </>
            }
        </>
    );
}

export default PostImage;