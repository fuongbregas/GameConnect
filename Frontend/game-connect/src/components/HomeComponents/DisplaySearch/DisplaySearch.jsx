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
    }

    const prevButton = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber-1);
    }

    return(
        <div>
            <div className='SearchResults'>
                Search Results
            </div>

            <button className='MoveSearchPageButton' onClick={backButton}>
                    Back
            </button>

            <div className='DisplaySearch'>
                    {
                        searchedGame.map(eachGame =>
                            <div className='EachResult' key={eachGame._id} onClick={() => routeToGame(eachGame.id)}>
                                {eachGame.name}
                            </div>)
                    }
                </div>

            <button className='MoveSearchPageButton' onClick={prevButton}>
                    Prev
            </button>

            <button className='MoveSearchPageButton' onClick={nextButton}>
                    Next
            </button>
        </div>
        
    );
}

export default DisplaySearch;