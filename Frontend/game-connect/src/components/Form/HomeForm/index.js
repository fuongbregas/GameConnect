import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import SavedGames from '../../HomeComponents/SavedGames/SavedGames';


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

const HomeForm = () => {

    return(
        <HomeContainer>
          <GenreListBox>
          
          </GenreListBox>
          <SavedGames>
              
          </SavedGames>
          <SearchbarNavbar>
            <NavbarRecommendationLink>
              Recommendation
            </NavbarRecommendationLink>

            <NavbarProfileLink>
              Profile
            </NavbarProfileLink>

            <NavbarNewReleasesLink>
              New Releases
            </NavbarNewReleasesLink>

            <SearchInput>
              <SearchIcon>

              </SearchIcon>
            </SearchInput>
          </SearchbarNavbar>
        </HomeContainer>
    );
}

export default HomeForm;