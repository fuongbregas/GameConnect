import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';


const SavedGames =  () => {
    const[savedGames, setSavedGames] = useState([]);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        const displayGameData = async() => {
          const res = await axios.get('/backend/game/get_saved_games/' + user);
          setSavedGames(res.data);
        }
        displayGameData();
    });

    return(
        <div className='SavedGames'>
            Saved Games
        </div>
    );
      
}



export default SavedGames;

