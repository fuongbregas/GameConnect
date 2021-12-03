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

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getGameStatus = async () => {
            try {
                const res = await axios.get('/backend/savedGames/saved_games/'+ user + '/' + gameID, {
                    cancelToken: source.token,
                });
                setGameStatus(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        }
        if(user !== null) {
            getGameStatus();
        }

        return () => {
            source.cancel();
        }
    }, [user, gameID]);

    const handelClick = () => {
        var link = '/community/' + gameID;
        window.open(link, '_blank');
    }

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
                    {
                        user ? <Button gameID = {gameID} gameStatus = {gameStatus} setGameStatus = {setGameStatus}/>
                        : null
                    }
                    <button className = 'community-link' onClick={handelClick}>Go to community</button>
                </div>
            </TabPanel>
        </Tabs>
        
    );
};

export default GameTab;
