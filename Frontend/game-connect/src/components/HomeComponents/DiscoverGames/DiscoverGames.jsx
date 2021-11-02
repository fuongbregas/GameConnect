import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './DiscoverGames.css';

const DiscoverGames = () => {
    const [discoverGames, setDiscoverGames] = useState([]);

    useEffect(() => {
        const displayGameData = async() => {
            // const res = await axios.get();
            // setDiscoverGames(res.data);
        }
        displayGameData();
    }, []);

    return(
        <div className = 'DiscoverGames'>
            Discover Games
        </div>
    );
}

export default DiscoverGames;