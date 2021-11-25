import {React, useEffect, useState} from 'react';
import axios from 'axios';
import HomeNavBar from '../../HomeComponents/HomeNavBar/HomeNavBar';
import DisplaySearch from '../../HomeComponents/DisplaySearch/DisplaySearch';
import GenreList from '../../HomeComponents/GenreList/GenreList';
import DisplayOptions from '../../HomeComponents/DisplayOptions/DisplayOptions';


import {
  HomeContainer,
  MainFeatureContainer,
  GenreListContainer,
  RightSideBox
} from './HomeFormElements'

const HomeForm = () => {
  const [searchedGame, setSearchedGame] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [navState, setNavState] = useState('New Releases');

  useEffect(() => {
    const getSearchData = async () => {
        //setPageNumber(1);
        try {
            const res = await axios.get("/backend/game/autosearch/" + searchValue + "/" + pageNumber);
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
          <GenreListContainer>
            <GenreList/>
          </GenreListContainer>

          <MainFeatureContainer>
            <RightSideBox>
              <HomeNavBar pageNumber={pageNumber} setPageNumber={setPageNumber} setSearchValue={setSearchValue} setNavState={setNavState}/>
              <DisplayOptions pageNumber={pageNumber} setPageNumber={setPageNumber} navState={navState}/>
            </RightSideBox>
            
          </MainFeatureContainer>
        </HomeContainer> :
        <DisplaySearch searchedGame={searchedGame} setSearchedGame={setSearchedGame} pageNumber= {pageNumber} setPageNumber={setPageNumber} setSearchValue={setSearchValue}/>
      }
      </>
    );
}

export default HomeForm;
