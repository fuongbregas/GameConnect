import { React, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './HomeNavBar.css';
import DisplaySearch from '../DisplaySearch/DisplaySearch';

const HomeNavBar = ({setSearchedGame}) => {
    const searchInput = useRef();

    //Search function
    const searchGames = async(event) => {
        event.preventDefault();
        const search = searchInput.current.value;
        try{
            const res = await axios.get("backend/game/autosearch/" + search);
            setSearchedGame(res.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        
    });

    return(
        <div className = 'HomeNavBar'>
            <li className = 'NavbarRecommendationLink'>
                Recommendations
            </li>
            <li className = 'NavbarNewReleasesLink'>
                New Releases
            </li>
            <li className = 'NavbarRandomizeLink'>
                Randomize
            </li>
            <input className = 'SearchInput'
                type='text'
                placeholder='Search for Games'
                ref={searchInput}>
            </input>
            <button className = 'SearchIcon'
            onClick={searchGames}>
                Submit
            </button>
        </div>
    );
}

export default HomeNavBar;