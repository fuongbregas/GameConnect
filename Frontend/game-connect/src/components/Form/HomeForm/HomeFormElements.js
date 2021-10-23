import styled from "styled-components";
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div `
    position: relative;
    min-height: 125vh;
`

export const SearchbarNavbar = styled.div`
  position: sticky;
  margin-top: 50px;
  margin-right: 50px;
  margin-left: 500px;
  padding: 25px;
  border: 5px solid #e7e7e7;
  background-color: #f3f3f3;
`

export const SearchInput = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  height: 25px;
  width: 50%;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
`

export const SearchIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 8px;
  width: 14px;
`

export const NavbarRecommendationLink = styled.li`
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

export const NavbarProfileLink = styled.li`
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

export const NavbarNewReleasesLink = styled.li`
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

export const GenreListBox = styled.div`
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

export const GenreList = styled.li`
  list-style-type: none;
  padding: 0px;
  margin-left: 50px;
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    color: #0084ff;
  }
`

export const DiscoverGamesBox = styled.div`
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

export const DiscoverGamesList = styled.div`


`