import { React, useContext, useRef } from 'react';
import {AuthContext} from '../../../context/AuthContext';
import './HomeNavBar.css';

const HomeNavBar = ({pageNumber, setPageNumber, setSearchValue, setNavState}) => {
    const searchInput = useRef();
    const {user} = useContext(AuthContext);

    //Search function
    const searchGames = async(event) => {
        event.preventDefault();
        const search = searchInput.current.value;
        setSearchValue(search);
    }

    const resetPageNumber = () => {
        setPageNumber(1);
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

            <div className='SecondNavBarContainer'>
                <div className='LinkContainer'>
                        <div className = 'NavbarLink' onClick={() => {setNavState('New Releases'); resetPageNumber();}}>
                            New Releases
                        </div>
                </div>
            </div>

            <div className='SecondNavBarContainer'>
                <div className='LinkContainer'>
                        <div className = 'NavbarLink' onClick={() => {setNavState('Discover Games'); resetPageNumber();}}>
                            Discover Games
                        </div>
                </div>
            </div>
            {user ?
                <div className='SecondNavBarContainer'>
                    <div className='LinkContainer'>
                        <div className='NavbarLink' onClick={() => {setNavState('Saved Games'); resetPageNumber();}}>
                            Saved Games
                        </div>
                    </div>
                </div>
                : null
            }

            {user ?
                <div className='SecondNavBarContainer'>
                    <div className='LinkContainer'>
                        <div className='NavbarLink' onClick={() => { setNavState('Recommendations'); resetPageNumber(); }}>
                            Recommendations
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default HomeNavBar;