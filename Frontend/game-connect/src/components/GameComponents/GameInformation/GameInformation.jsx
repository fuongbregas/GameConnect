import {React, useEffect, useState, useContext} from 'react';
import './GameInformation.css';
import {CircularProgress} from '@material-ui/core';
import Pie from '../../PercentageRing/Pie';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';

const GameInformation = ({gameID}) => {
    const {user} = useContext(AuthContext);
    const [gameInfo, setGameInfo] = useState(null);
    const [rating, setRating] = useState(0);
    const getGameInfo = async () => {
        const res = await axios.get('/backend/game/get_one_game/' + gameID);
        setGameInfo(res.data);
        setRating(res.data.rating);
    }

    useEffect(() => {
        getGameInfo();
    }, [gameID]);

    return (
        <div className = 'gameinfoContainer'>
            <div>
                <div className = 'titleContainer'>
                    {
                        gameInfo !== null ? 
                        <h1 className = 'gameName'>{gameInfo.name}</h1>
                        : null
                    }
                    <Pie percentage = {rating} colour={
                        rating > 50 ? "green" : "#964B00"
                    }/>
                </div>
                {
                    gameInfo !== null ? 
                    <>
                        <h2 className = 'extra'>Initial release date: {gameInfo.first_release_date}</h2>
                        <h2 className = 'extra'>Genres:{" "}
                            {
                                gameInfo.genres.map(each_genre => each_genre.name).join(', ')
                            }
                        </h2>
                        <p className = 'summary'>{gameInfo.summary}</p>
                    </>
                    : <CircularProgress/> 
                }
            </div>
        </div>
    );
};

export default GameInformation;