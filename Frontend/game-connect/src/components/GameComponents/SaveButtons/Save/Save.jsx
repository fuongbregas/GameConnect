import {React, useContext} from 'react';
import './Save.css';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext';

const Save = ({gameID, setGameStatus}) => {
    const {user} = useContext(AuthContext);

    const handleClick = async (event) => {
        event.preventDefault();
        const data = {
            user: user,
            gameID: gameID,
        };
        try {
            const res = await axios.put('/backend/savedGames/saved_games/save', data);
            setGameStatus(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <button className= "save_game" onClick={handleClick}>Save game</button>
    );
}

export default Save;