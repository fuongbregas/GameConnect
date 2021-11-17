import { React, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './HomeNavBar.css';
import DisplaySearch from '../DisplaySearch/DisplaySearch';

const HomeNavBar = ({pageNumber, setSearchValue, setNavState}) => {
    const searchInput = useRef();
    const {user} = useContext(AuthContext);

    //Search function
    const searchGames = async(event) => {
        event.preventDefault();
        const search = searchInput.current.value;
        setSearchValue(search);
    }

    return(
        <div className = 'HomeNavBar'>
            <div className='FirstNavBarContainer'>
                <div className='SearchContainer'>
                    <input className = 'SearchInput'
                        type='text'
                        placeholder='Search for Games'
                        ref={searchInput}>
                    </input>
                    <button className = 'SearchButton'
                        onClick={searchGames}>
                        Submit
                    </button>
                </div>
            </div>

            {user ?
                <div className='SecondNavBarContainer'>
                    <div className='LinkContainer'>
                        <div className='NavbarLink' onClick={() => setNavState('Recommendations')}>
                            Recommendations
                        </div>
                    </div>
                </div>
                : null
            }
            

            <div className='SecondNavBarContainer'>
                <div className='LinkContainer'>
                        <div className = 'NavbarLink' onClick={() => setNavState('New Releases')}>
                            New Releases
                        </div>
                </div>
            </div>

            <div className='SecondNavBarContainer'>
                <div className='LinkContainer'>
                        <div className = 'NavbarLink' onClick={() => setNavState('Discover Games')}>
                            Discover Games
                        </div>
                </div>
            </div>
            {user ?
                <div className='SecondNavBarContainer'>
                    <div className='LinkContainer'>
                        <div className='NavbarLink' onClick={() => setNavState('Saved Games')}>
                            Saved Games
                        </div>
                    </div>
                </div>
                : null
            }
            
            
        </div>
    );
}

export default HomeNavBar;