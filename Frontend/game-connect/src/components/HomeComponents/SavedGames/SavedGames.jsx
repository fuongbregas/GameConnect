import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './SavedGames.css';


const SavedGames =  () => {
    const[savedGames, setSavedGames] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const grabSavedGames = async() => {
            const res = await axios.get('/backend/game/get_saved_games/' + user);
            setSavedGames(res.data);
        }
        grabSavedGames();
    }, [user]);

    return(
        <div className='SavedGames'>
            {
                // <img className = 'EachGame'
                // src = {cover !== '' ? cover : '/no_image.jpg'} 
                // alt = ''/>
                savedGames.map(eachGame => 
                <img className='EachGame' key={eachGame.cover}
                    src = {eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                    alt = ''>
                </img>)
            }
        </div>
    );
      
}



export default SavedGames;

