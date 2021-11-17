import './GenreDisplay.css';
import {useParams} from 'react-router';
import { React, useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function GenreDisplay() {
    const {genreID} = useParams();
    const [genreGames, setGenreGames] = useState([]);
    const history = useHistory();

    console.log(genreID);

    const handleClick = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    useEffect(() => {
        const grabGenreGames = async() => {
            const res = await axios.get('/backend/game/genres/' + genreID);
            setGenreGames(res.data);
        }
        grabGenreGames();
    }, []);

    return(
      <>
        <div className="FullContentContainer">
            <div className="TopContainer">

            </div>
            <div className="BottomContainer">
                {
                    genreGames.map(eachGame => (
                        <div className="GameOfGenre" onClick={() => handleClick(eachGame.id)}> 
                            <img className = "GameOfGenreCover" 
                             src = {eachGame.cover !== '' && eachGame.cover  !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                             alt = ''/>
                             <h2 className = 'GameOfGenreName'>{eachGame.name}</h2>
                        </div> 
                    ))
                }
            </div>
        </div>
      </>
    );
}