import { React} from 'react';
import './DisplaySearch.css';
import { useHistory } from 'react-router';

const DisplaySearch = ({searchedGame, setSearchedGame, pageNumber, setPageNumber, setSearchValue}) => {
    const history = useHistory();

    const backButton = (event) => {
        event.preventDefault();
        setSearchedGame(null);
        setPageNumber(1);
        setSearchValue('');
    }

    const routeToGame = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    const nextButton = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber+1);
        console.log(pageNumber);
    }

    const prevButton = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber-1);
        console.log(pageNumber);
    }

    const roundRating = (rating) => {
        const rounded = Math.round(rating);
        if(rounded !== 0){
            return <h4 className='EachSearchGameRating'>Rating: {rounded}</h4>
        }
        else{
            return <h4 className='EachSearchGameRating'>Rating: N/A</h4>        
        }
    }

    const convertReleaseDate = (date) =>{
        const releaseDate = new Date(date).toLocaleDateString('en-GB', {month: 'long', day: 'numeric', year: 'numeric'});
        return <h4>Initial Release Date: {releaseDate}</h4>
    }

    return(
        <div className='DisplaySearchPageContainer'>
            <div className='SearchResults'>
                <h3 className='HeaderText'>Search Results</h3>
                <button className='MoveSearchPageBackButton' onClick={backButton}>
                    Back
                </button>
            </div>

            <div className='DisplaySearch'>
                    {
                        searchedGame.map(eachGame =>
                            <div className='EachResult' key={eachGame._id} onClick={() => routeToGame(eachGame.id)}>
                                <img className='DisplayEachSearchedGame'
                                    src = {eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                                    alt = ''
                                    onClick={() => routeToGame(eachGame.id)}>
                                </img>
                                <div className='EachSearchGameName'>{eachGame.name}</div>
                                {roundRating(eachGame.rating)}
                                {convertReleaseDate(eachGame.first_release_date)}
                            </div>)
                    }
                </div>
            <div className='ButtonContainer'>
                <button className='MoveSearchPageButton' onClick={prevButton} disabled={
                    pageNumber === 1 ? true : false
                }> {'< '}
                    Prev
                </button>
                {' | '}
                <button className='MoveSearchPageButton' onClick={nextButton} disabled={
                    searchedGame.length === 1 ? true : false
                }>
                    Next {'>'}
                </button>
            </div>
            
        </div>
        
    );
}

export default DisplaySearch;