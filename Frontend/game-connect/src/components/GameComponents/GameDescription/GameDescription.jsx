import {React} from 'react';
import './GameDescription.css';

const GameDescription = ({gameInfo}) => {
    return(
        <>
            <h2 className = 'extra'>Initial release date: {gameInfo.first_release_date}</h2>
            <h2 className = 'extra'>Genres:{" "}
                {
                    gameInfo.genres.map(each_genre => each_genre.name).join(', ')
                }
            </h2>
            <p className = 'summary'>{gameInfo.summary}</p>
        </>
    );
}

export default GameDescription;