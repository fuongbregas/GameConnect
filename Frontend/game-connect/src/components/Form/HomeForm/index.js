import { React, useEffect, useState } from 'react';
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
  const [nextSearchedGame, setNextSearchedGame] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [navState, setNavState] = useState('New Releases');

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getSearchData = async () => {
      //setPageNumber(1);
      try {
        const res = await axios.get("/backend/game/autosearch/" + searchValue + "/" + pageNumber, {
          cancelToken: source.token,
        });
        setSearchedGame(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {

        } else {
          console.log(error);
        }
      }
    }
    if (searchValue !== '') {
      getSearchData();
    }
    return () => {
      source.cancel();
    }
  }, [searchValue, pageNumber]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getNextSearchData = async () => {
      try {
        const nextPageNumber = pageNumber + 1;
        const res = await axios.get("/backend/game/autosearch/" + searchValue + "/" + nextPageNumber, {
          cancelToken: source.token,
        });
        setNextSearchedGame(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {

        } else {
          console.log(error);
        }
      }
    }
    if (searchValue !== '') {
      getNextSearchData();
    }
    return () => {
      source.cancel();
    }
  }, [searchValue, pageNumber]);

  return (
    <>
      {searchedGame === null ?

        <HomeContainer>
          <GenreListContainer>
            <GenreList />
          </GenreListContainer>

          <MainFeatureContainer>
            <RightSideBox>
              <HomeNavBar setPageNumber={setPageNumber} setSearchValue={setSearchValue} setNavState={setNavState} />
              <DisplayOptions pageNumber={pageNumber} setPageNumber={setPageNumber} navState={navState} />
            </RightSideBox>

          </MainFeatureContainer>
        </HomeContainer> :
        <DisplaySearch searchedGame={searchedGame} setSearchedGame={setSearchedGame} nextSearchedGame={nextSearchedGame} setNextSearchedGame={setNextSearchedGame} pageNumber={pageNumber} setPageNumber={setPageNumber} setSearchValue={setSearchValue} />
      }
    </>
  );
}

export default HomeForm;
