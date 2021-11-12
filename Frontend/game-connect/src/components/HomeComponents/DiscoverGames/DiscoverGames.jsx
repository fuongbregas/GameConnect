import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './DiscoverGames.css';

const DiscoverGames = () => {
    const [discoverGames, setDiscoverGames] = useState([]);

    const grabDiscoverGames = async() => {
        const res = await axios.get('/backend/game/get_rated_game');
        setDiscoverGames(res.data);
    }

    useEffect(() => {
        grabDiscoverGames();
    }, []);

    console.log('discoverGames:' + discoverGames);
    return(
        <div className = 'DiscoverGames'>
            Discover Games
            {
                discoverGames.map(eachGame =>
                    <img className='DiscoverGamesList' key={eachGame.cover}
                        src={eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                        alt=''>
                    </img>)
            }
        </div>
    );
}

export default DiscoverGames;