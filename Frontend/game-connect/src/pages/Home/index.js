import React from 'react';
import './Home.css';
import axios from 'axios';
import styled from 'styled-components'
import { NavItem } from '../../components/Navbar/NavbarElements';
import { Link } from 'react-router-dom';

function displayGameData() {
  axios.get('/backend/game_data').then((res) =>{

    let data = res.gameData;
    console.log("Test \n" + JSON.stringify(res));
    this.setState({game : data.name}); 
    console.log(this.state.game);
  })
  .catch((error) => {
    console.log(error);
  });
}

const SearchbarNavbar = styled.div`
  position: sticky;
  margin-top: 50px;
  margin-right: 50px;
  margin-left: 500px;
  padding: 25px;
  border: 5px solid #e7e7e7;
  background-color: #f3f3f3;
`

const SearchInput = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  height: 25px;
  width: 50%;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
`

const SearchIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 8px;
  width: 14px;
`

const NavbarRecommendationLink = styled.li`
  list-style-type: none;
  color: #000;
  cursor: pointer;
  float: right;
  position: relative;
  right: 280px;


  &:hover {
    color: #0084ff;
  }

`

const NavbarProfileLink = styled.li`
  list-style-type: none;
  color: #000;
  cursor: pointer;
  float: right;
  position: relative;
  right: 80px;
  
  &:hover {
    color: #0084ff;
  }
`

const NavbarNewReleasesLink = styled.li`
  list-style-type: none;
  color: #000;
  cursor: pointer;
  float: right;
  position: relative;
  right: -100px;
  
  &:hover {
    color: #0084ff;
  }
`

const GenreListBox = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #f5f5f5;
  outline: 0;
  position: absolute;
  display: inline-block;
  left: 8px;
  width: 300px;
  height: 500px;
  padding-top: 10px;
`

const GenreList = styled.li`
  list-style-type: none;
  padding: 0px;
  margin-left: 50px;
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    color: #0084ff;
  }
`

const SavedGamesBox = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #f5f5f5;
  outline: 0;
  position: absolute;
  width: 500px;
  height: 300px;
  right: 100px;
  bottom: 40px;
  top: 100px;

`

const SavedGamesList = styled.div`


`

const DiscoverGamesBox = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #f5f5f5;
  outline: 0;
  position: absolute;
  width: 500px;
  height: 300px;
  right: 50px;
  bottom: 40px;

`

const DiscoverGamesList = styled.div`


`

export default function Home() {
    return(
        <div className="home">
          <GenreListBox>
            <GenreList>
              BROWSE BY GENRE
            </GenreList>
            <GenreList>
              Fighting
            </GenreList>
            <GenreList>
              Action
            </GenreList>
            <GenreList>
              Shooter
            </GenreList>
            <GenreList>
              Music
            </GenreList>
            <GenreList>
              Platform
            </GenreList>
            <GenreList>
              Puzzle
            </GenreList>
            <GenreList>
              Racing
            </GenreList>
            <GenreList>
              Real Time Strategy (RTS)
            </GenreList>
            <GenreList>
              RPG
            </GenreList>
            <GenreList>
              Simulator
            </GenreList>
            <GenreList>
              Sport
            </GenreList>
            <GenreList>
              Strategy
            </GenreList>
            <GenreList>
              Turn-based Strategy
            </GenreList>
            <GenreList>
              Tactical
            </GenreList>
            <GenreList>
              Quiz/Trivia
            </GenreList>
            <GenreList>
              Hack and Slash
            </GenreList>
            <GenreList>
              Pinball
            </GenreList>
            <GenreList>
              Adventure
            </GenreList>
            <GenreList>
              Arcade
            </GenreList>
            <GenreList>
              Visual Novel
            </GenreList>
            <GenreList>
              Indie
            </GenreList>
            <GenreList>
              MOBA
            </GenreList>
            <GenreList>
              Point-and-Click
            </GenreList>
          </GenreListBox>
          <SavedGamesBox>
            Saved Games
          </SavedGamesBox>
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
        </div>
    );
}