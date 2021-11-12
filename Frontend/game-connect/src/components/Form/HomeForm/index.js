import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import SavedGames from '../../HomeComponents/SavedGames/SavedGames';
import HomeNavBar from '../../HomeComponents/HomeNavBar/HomeNavBar';
import DiscoverGames from '../../HomeComponents/DiscoverGames/DiscoverGames';
import DisplaySearch from '../../HomeComponents/DisplaySearch/DisplaySearch';
import GenreList from '../../HomeComponents/GenreList/GenreList';


import {
  SearchbarNavbar,
  SearchInput,
  SearchIcon,
  NavbarRecommendationLink,
  NavbarProfileLink,
  NavbarNewReleasesLink,
  GenreListBox,
  DiscoverGamesBox,
  DiscoverGamesList,
  HomeContainer
} from './HomeFormElements'
import { Fragment } from 'react';

const HomeForm = () => {
  const [searchedGame, setSearchedGame] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getSearchData = async () => {
        try {
            const res = await axios.get("backend/game/autosearch/" + searchValue + "/" + pageNumber);
            setSearchedGame(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    if(searchValue !== ''){
      getSearchData();
    }
}, [searchValue, pageNumber]);

    return(
      <>
      {searchedGame === null ? 
      
        <HomeContainer>
          <HomeNavBar pageNumber={pageNumber} setSearchValue={setSearchValue}/>
          <SavedGames/>
          <DiscoverGames/>
          <GenreList/>
        </HomeContainer> : 
        <DisplaySearch searchedGame={searchedGame} setSearchedGame={setSearchedGame} pageNumber= {pageNumber} setPageNumber={setPageNumber} setSearchValue={setSearchValue}/>
      }
      </>
    );
}

export default HomeForm;