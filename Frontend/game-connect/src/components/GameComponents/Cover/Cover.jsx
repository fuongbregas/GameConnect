import {React, useEffect, useState} from 'react';
import './Cover.css';
import axios from 'axios';

const Cover = ({gameID}) => {
    const [cover, setCover] = useState('');
    const [result, setRes] = useState([]);

    const getImage = async () => {
        try {
            const res = await axios.get('/backend/game/get_one_game_image/' + gameID);
            // Need http header to work correctly
            setCover("https://" + res.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect (() => {
        getImage();
    }, [gameID]);

    return (
        <div className = 'coverContainer'>
            <img className = 'coverImage'
                 src = {cover !== '' ? cover : '/no_image.jpg'} 
                 alt = ''/>
        </div>
    );
}

export default Cover;

/*
colour={
                        rating > 50 ? "green" : "#964B00"
                    }
*/