import React from 'react';
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext';
import styled from 'styled-components'
import axios from 'axios';


const AboutPage = styled.div`
  position: relative;
  min-height: 100vh;
`

const AboutGameConnectContainer = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #f5f5f5;
  outline: 0;
  position: absolute;
  width: 900px;
  height: 300px;
  right: 270px;
  top: 40px;
  text-align: center;

`

const AboutGameConnect = styled.p `
  

`

const AboutTeamContainer = styled.div`



`

export default function About() {
  const user = useContext(AuthContext);
    return(
      <AboutPage>
        <AboutGameConnectContainer>
          About GameConnect
          <AboutGameConnect>
            GameConnect is an all-in one social network where players that play on different gaming platforms can connect to each other. Gamers can find communities to discuss various aspects of their gaming experience via a moderated forum, and use built-in recommendation systems to enhance their gaming experience. The outcome of this project is to provide a social platform that allows users to collaborate and share knowledge of PC-based games.
          </AboutGameConnect>
        </AboutGameConnectContainer>


      </AboutPage>

        // <>
        //   <h1 className='about'>About Page</h1>
          
        // </>
    );
}