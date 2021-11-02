import { React, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './DisplaySearch.css';
import { useHistory } from 'react-router';

const DisplaySearch = ({searchedGame, setSearchedGame}) => {
    const history = useHistory();

    const backButton = (event) => {
        event.preventDefault();
        setSearchedGame(null);
    }

    const routeToGame = (event) => {
        event.preventDefault();
        history.push('/about');
    }

    return(
        <div className='DisplaySearch'>
            {
                searchedGame.map(eachGame =>
                    <div key={eachGame._id} onClick = {routeToGame}>
                        {eachGame.name}
                    </div>)
            }
            <button onClick={backButton}>
                Back
            </button>
        </div>
    );
}

export default DisplaySearch;