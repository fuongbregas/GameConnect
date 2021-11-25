import './GenreDisplay.css';
import {useParams} from 'react-router';
import { React, useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const GenreDisplay = () => {
    const {genreID, genreName} = useParams();
    const [genrePageNumber, setGenrePageNumber] = useState(1);
    const [genreGames, setGenreGames] = useState([]);
    const history = useHistory();

    const handleClick = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    const nextButton = (event) => {
        event.preventDefault();
        setGenrePageNumber(genrePageNumber + 1);
    }

    const prevButton = (event) => {
        event.preventDefault();
        setGenrePageNumber(genrePageNumber - 1);
    } 

    const roundRating = (rating) => {
        const rounded = Math.round(rating);
        if(rounded !== 0){
            return <h4>Rating: {rounded}</h4>
        }
        else{
            return <h4>Rating: N/A</h4>        
        }
    }

    const convertReleaseDate = (date) =>{
        const releaseDate = new Date(date).toLocaleDateString('en-GB', {month: 'long', day: 'numeric', year: 'numeric'});
        return <h4>Initial Release Date: {releaseDate}</h4>
    }

    useEffect(() => {
        const grabGenreGames = async() => {
            const res = await axios.get('/backend/game/genres/' + genreID + '/' + genrePageNumber);
            setGenreGames(res.data);
        }
        grabGenreGames();
    }, [genreID, genrePageNumber]);

    return(
      <>
        <div className="FullContentContainer">
            <div className="TopContainer">
                <h1 className='GenreDisplayName'>{genreName}</h1>
                <p className='GenreDisplayBlurb'>Check out games from the {genreName} genre!</p>
            </div>
            <div className="BottomContainer">
                {
                    genreGames.map(eachGame => (
                        <div className="GameOfGenre" key={eachGame.id} onClick={() => handleClick(eachGame.id)}>
                            <div className='GenreFirst'>
                                <img className="GameOfGenreCover"
                                    src={eachGame.cover !== '' && eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                                    alt='' />
                            </div> 
                             <div className='GenreSecond'>
                                <h2 className='GameOfGenreName'>{eachGame.name}</h2>
                             </div>
                             <div className='GenreThird'>
                                {roundRating(eachGame.rating)}
                             </div>
                             <div className='GenreFourth'>
                                {convertReleaseDate(eachGame.first_release_date)}
                             </div>
                        </div> 
                    ))
                }
                <div className='GenrePageButtonContainer'>
                        <button className='MoveGenrePageButton' onClick={prevButton} disabled={
                            genrePageNumber === 1 ? true : false
                        }> {'< '}
                            Prev
                        </button>
                        {' | '}
                        <button className='MoveGenrePageButton' onClick={nextButton} disabled={
                            genreGames.length === 1 ? true : false
                        }>
                            Next {'>'}
                        </button>
                </div>
                
            </div>
        </div>
      </>
    );
}
export default GenreDisplay;