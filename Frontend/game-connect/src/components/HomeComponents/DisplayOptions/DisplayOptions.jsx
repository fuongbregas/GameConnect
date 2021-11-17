import { React, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import { useHistory } from 'react-router';
import './DisplayOptions.css';

const DisplayOptions = ({navState, pageNumber, setPageNumber}) => {

    const {user} = useContext(AuthContext);
    const[data, setData] = useState([]);
    const[nextData, setNextData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const grabGameData = async() => {
            if(navState === 'Saved Games'){
                if(user !== null){
                    const res = await axios.get('/backend/savedGames/' + user + '/' + pageNumber);
                    setData(res.data);
                }
            }
            else if(navState === 'Discover Games'){
                const res = await axios.get('/backend/game/get_rated_game/');
                setData(res.data);
            }
            else if(navState === 'Recommendations'){
                if(user !== null){
                    //Add API lol
                }
            }
            else if(navState === 'New Releases'){
                //Add API lol
            }
        }
        grabGameData();
    }, [pageNumber, user, navState]);

    useEffect(() => {
        const nextPageNumber = pageNumber + 1;
        const grabNextGameData = async() => {
            if(navState === 'Saved Games'){
                if(user !== null){
                    const res = await axios.get('/backend/savedGames/' + user + '/' + nextPageNumber);
                    setNextData(res.data);
                }
            }
            else if(navState === 'Discover Games'){
                const res = await axios.get('/backend/game/get_rated_game/');
                setNextData(res.data);
            }
            else if(navState === 'Recommendations'){
                if(user !== null){
                    //Add API lol
                }
            }
            else if(navState === 'New Releases'){
                //Add API lol
            }
        }
        grabNextGameData();
    }, [pageNumber, user, navState]);

    const routeToGame = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    const nextButton = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber+1);
    }

    const prevButton = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber-1);
    }

    return(
        <div className='DisplayOptionsContainer'>
            <h1>{navState}</h1>
                <div className='DisplayOptionsBox'>
                    {
                        data.map(eachGame => (
                            <div className = 'DisplayOptionsDisplay' key={eachGame.id}>
                                <img className='DisplayEachGame'
                                    src = {eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                                    alt = ''
                                    onClick={() => routeToGame(eachGame.id)}>
                                </img>
                                <h2> {eachGame.name} </h2>
                            </div>))
                    }
                </div>
        </div>
    );
}
export default DisplayOptions;
