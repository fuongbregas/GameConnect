import {React, useState, useContext, useEffect} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './GameTab.css';
import GameDescription from '../GameDescription/GameDescription';
import Button from '../SaveButtons/Button';
const GameTab = ({gameInfo, gameID}) => {
    const {user} = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [gameStatus, setGameStatus] = useState('');

    const getGameStatus = async () => {
        const res = await axios.get('/backend/savedGames/saved_games/'+ user + '/' + gameID);
        setGameStatus(res.data);
    }

    useEffect(() => {
        getGameStatus();
    });

    return(
        <Tabs selected={tabIndex} onSelect = {index => setTabIndex(index)}>
            <TabList>
                <Tab>About</Tab>
                <Tab>More</Tab>
            </TabList>
            <TabPanel>
                <div className = 'tab-container'>
                    <GameDescription gameInfo={gameInfo} gameID={gameID}/>
                </div>
                
            </TabPanel>
            <TabPanel>
                <div className = 'tab-container'>
                    <Button gameID = {gameID} gameStatus = {gameStatus} setGameStatus = {setGameStatus}/>
                </div>
            </TabPanel>
        </Tabs>
        
    );
};

export default GameTab;
