import {React, useContext} from 'react';
import './Unsave.css';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext';

const Unsave = ({gameID, setGameStatus}) => {
    const {user} = useContext(AuthContext);

    const handleClick = async (event) => {
        event.preventDefault();
        const data = {
            user: user,
            gameID: gameID,
        };
        try {
            const res = await axios.put('/backend/users/saved_games/unsave', data);
            setGameStatus(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <button className= "unsave_game" onClick={handleClick}>Unsave game</button>
    );
}

export default Unsave;