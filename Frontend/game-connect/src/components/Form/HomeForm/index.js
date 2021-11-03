import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import SavedGames from '../../HomeComponents/SavedGames/SavedGames';
import HomeNavBar from '../../HomeComponents/HomeNavBar/HomeNavBar';
//import SearchBar from '../../HomeComponents/SearchBar/SearchBar';
import DiscoverGames from '../../HomeComponents/DiscoverGames/DiscoverGames';
import DisplaySearch from '../../HomeComponents/DisplaySearch/DisplaySearch';


import {
  SearchbarNavbar,
  SearchInput,
  SearchIcon,
  NavbarRecommendationLink,
  NavbarProfileLink,
  NavbarNewReleasesLink,
  GenreListBox,
  GenreList,
  DiscoverGamesBox,
  DiscoverGamesList,
  HomeContainer
} from './HomeFormElements'
import { Fragment } from 'react';

const HomeForm = () => {
  const [searchedGame, setSearchedGame] = useState(null);

    return(
      <>
      {searchedGame === null ? 
      
        <HomeContainer>
          <HomeNavBar setSearchedGame={setSearchedGame}/>
          <SavedGames/>
          <DiscoverGames/>
        </HomeContainer> : 
        <DisplaySearch searchedGame={searchedGame} setSearchedGame={setSearchedGame}/>
      }
      </>
    );
}

export default HomeForm;