import { React, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './HomeNavBar.css';
import DisplaySearch from '../DisplaySearch/DisplaySearch';

const HomeNavBar = ({pageNumber, setSearchValue}) => {
    const searchInput = useRef();

    //Search function
    const searchGames = async(event) => {
        event.preventDefault();
        const search = searchInput.current.value;
        setSearchValue(search);
    }

    // useEffect(() => {
    //     const getSearchData = async () => {
    //         try {
    //             const res = await axios.get("backend/game/autosearch/" + searchValue + "/" + pageNumber);
    //             setSearchedGame(res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getSearchData();
    // }, [searchValue, pageNumber]);
    console.log(pageNumber);

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