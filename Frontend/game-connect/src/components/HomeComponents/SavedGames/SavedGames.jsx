import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import { useHistory } from 'react-router';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './SavedGames.css';

const SavedGames =  () => {
    const[savedGames, setSavedGames] = useState([]);
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const handleClick = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    useEffect(() => {
        const grabSavedGames = async() => {
            const res = await axios.get('/backend/savedGames/get_saved_games/' + user);
            setSavedGames(res.data);
        }
        grabSavedGames();
    }, [user]);

    return(
        <div className='SavedGamesContainer'>
            
                <div className='SavedGamesBox'>
                    {
                        savedGames.map(eachGame => (
                            <div className = 'SavedGamesDisplay' key={eachGame.id}>
                                <img className='EachGame'
                                    src = {eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                                    alt = ''
                                    onClick={() => handleClick(eachGame.id)}>
                                </img>
                            </div>))
                    }
                </div>
        </div>
    );
}



export default SavedGames;

