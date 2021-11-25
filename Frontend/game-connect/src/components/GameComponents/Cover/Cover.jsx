import {React, useEffect, useState} from 'react';
import './Cover.css';
import axios from 'axios';

const Cover = ({gameID, setError}) => {
    const [cover, setCover] = useState('');

    useEffect (() => {
        const getImage = async () => {
            try {
                const res = await axios.get('/backend/game/get_one_game_image/' + gameID);
                // Need http header to work correctly
                if(res.data === null ) {
    
                }
                else {
                    setCover("https://" + res.data);
                }
            }
            catch (error) {
                setError(error);
            }
        }
        
        getImage();
    }, [gameID, setError]);

    return (
        <div className = 'coverContainer'>
            <img className = 'coverImage'
                 src = {cover !== '' ? cover : '/no_image.jpg'} 
                 alt = ''/>
        </div>
    );
}

export default Cover;