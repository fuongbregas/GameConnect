import {React, useEffect, useState, useContext} from 'react';
import './GameInformation.css';
import {CircularProgress} from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';

const GameInformation = ({gameID}) => {
    const {user} = useContext(AuthContext);
    const [gameInfo, setGameInfo] = useState(null);
    const [color, setColor] = useState('#964B00');
    const [rating, setRating] = useState(0);
    const getGameInfo = async () => {
        const res = await axios.get('/backend/game/get_one_game/' + gameID);
        setGameInfo(res.data);
        setRating(Math.round(res.data.rating));
        if (rating > 50) {
            setColor('#50C878');
        }
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