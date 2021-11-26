import {React, useEffect, useState} from 'react';
import './GameInformation.css';
import {CircularProgress} from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import GameTab from '../GameTab/GameTab';

const GameInformation = ({gameID}) => {
    const [gameInfo, setGameInfo] = useState(null);
    const [color, setColor] = useState('#964B00');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getGameInfo = async () => {
            try {
                const res = await axios.get('/backend/game/get_one_game/' + gameID);
                setGameInfo(res.data);
                setRating(Math.round(res.data.rating));
                if (rating > 50) {
                    setColor('#50C878');
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        getGameInfo();
    }, [gameID, rating]);

    return (
        <div className = 'gameinfoContainer'>
            <div className = 'inside'>
                <div className = 'titleContainer'>
                    {
                        gameInfo !== null ? 
                        <h1 className = 'gameName'>{gameInfo.name}</h1>
                        : null
                    }
                    <div className ='ratingContainer' style={{ width: 140, height: 140 }}>
                        <CircularProgressbar
                            value={rating}
                            text={rating}
                            styles={{
                                // Customize the root svg element
                                root: {},
                                // Customize the path, i.e. the "completed progress"
                                path: {
                                // Path color
                                stroke: color,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Customize transition animation
                                transition: 'stroke-dashoffset 1s ease 1s',
                                // Rotate the path
                                transformOrigin: 'center center',
                            },
                            // Customize the text
                            text: {
                                // Text color
                                fill: 'white',
                                // Text size
                                fontSize: '25px',
                            }
                        }}/>
                    </div>
                </div>
                {
                    gameInfo !== null ?
                    <GameTab gameInfo = {gameInfo} gameID = {gameID}/>
                    : <CircularProgress/> 
                }
            </div>
        </div>
    );
};

export default GameInformation;