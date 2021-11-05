import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import SavedGames from '../../HomeComponents/SavedGames/SavedGames';
import HomeNavBar from '../../HomeComponents/HomeNavBar/HomeNavBar';
import DiscoverGames from '../../HomeComponents/DiscoverGames/DiscoverGames';
import DisplaySearch from '../../HomeComponents/DisplaySearch/DisplaySearch';

import {HomeContainer} from './HomeFormElements'

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