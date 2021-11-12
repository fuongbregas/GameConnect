import { React, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
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

    const routeToGame = (event) => {
        event.preventDefault();
        history.push('/game/' + searchedGame.id);
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
            <div className='DisplaySearch'>
                    {
                        searchedGame.map(eachGame =>
                            <div key={eachGame._id} onClick={routeToGame}>
                                {eachGame.name}
                            </div>)
                    }
                </div>
            <button className='BackButton' onClick={backButton}>
                    Back
            </button>

            <button className='PrevButton' onClick={prevButton}>
                    Prev
            </button>

            <button className='NextButton' onClick={nextButton}>
                    Next
            </button>
        </div>
        
    );
}

export default DisplaySearch;