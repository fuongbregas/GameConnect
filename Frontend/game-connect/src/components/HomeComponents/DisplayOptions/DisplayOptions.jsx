import { React, useEffect, useState, useContext } from 'react';
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
        const source = axios.CancelToken.source();
        const grabGameData = async() => {
            try {
                if(navState === 'Saved Games'){
                    if(user !== null){
                        const res = await axios.get('/backend/savedGames/' + user + '/' + pageNumber, {
                            cancelToken: source.token,
                        });
                        setData(res.data);
                    }
                }
                else if(navState === 'Discover Games'){
                    const res = await axios.get('/backend/game/get_rated_game/' + pageNumber, {
                        cancelToken: source.token,
                    });
                    setData(res.data);
                }
                else if(navState === 'Recommendations'){
                    if(user !== null){
                        const res = await axios.get('backend/game/get_recommended_game/' + user + '/' + pageNumber, {
                            cancelToken: source.token,
                        });
                        setData(res.data);
                    }
                }
                else if(navState === 'New Releases'){
                    const res = await axios.get('/backend/game/get_new_games/' + pageNumber, {
                        cancelToken: source.token,
                    });
                    setData(res.data);
                }
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        }
        grabGameData();
        return () => {
            source.cancel();
        }
    }, [pageNumber, user, navState]);

    useEffect(() => {
        const nextPageNumber = pageNumber + 1;
        const source = axios.CancelToken.source();
        const grabNextGameData = async() => {
            try {
                if(navState === 'Saved Games'){
                    if(user !== null){
                        const res = await axios.get('/backend/savedGames/' + user + '/' + nextPageNumber, {
                            cancelToken: source.token,
                        });
                        setNextData(res.data);
                    }
                }
                else if(navState === 'Discover Games'){
                    const res = await axios.get('/backend/game/get_rated_game/' + pageNumber, {
                        cancelToken: source.token,
                    });
                    setNextData(res.data);
                }
                else if(navState === 'Recommendations'){
                    if(user !== null){
                        const res = await axios.get('backend/game/get_recommended_game/' + user + '/' + pageNumber, {
                            cancelToken: source.token,
                        });
                        setNextData(res.data);
                    }
                }
                else if(navState === 'New Releases'){
                    const res = await axios.get('/backend/game/get_new_games/' + pageNumber, {
                        cancelToken: source.token,
                    });
                    setNextData(res.data);
                }
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        }
        grabNextGameData();
        return () => {
            source.cancel();
        }
    }, [pageNumber, user, navState]);

    const textToReturn = (navState) => {
        if(navState === 'Saved Games'){
            return <p className='NavStateBlurbText'>Here's a list of all your saved games</p>
        }
        else if(navState === 'Discover Games'){
            return <p className='NavStateBlurbText'>Discover the best titles out right now</p>
        }
        else if(navState === 'Recommendations'){
            return <p className='NavStateBlurbText'>Here are some titles recommended for you based off of what you love</p>
        }
        else if(navState === 'New Releases'){
            return <p className='NavStateBlurbText'>Browse the latest releases</p>
        }
    }

    const roundRating = (rating) => {
        const rounded = Math.round(rating);
        if(rounded !== 0){
            return <h4 className='DisplayEachGameRating'>Rating: {rounded}</h4>
        }
        else{
            return <h4 className='DisplayEachGameRating'>Rating: N/A</h4>        
        }
    }

    const convertReleaseDate = (date) =>{
        const releaseDate = new Date(date).toLocaleDateString('en-GB', {month: 'long', day: 'numeric', year: 'numeric'});
        return <h4 className='DisplayEachGameDate'>Initial Release Date: {releaseDate}</h4>
    }
   
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
            <h1 className='NavStateName'>{navState}</h1>
            {textToReturn(navState)}
                <div className='DisplayOptionsBox'>
                    {
                        data.map(eachGame => (
                            <div className = 'DisplayOptionsDisplay' key={eachGame.id}>
                                <div className='DisplayFirst'>
                                    <img className='DisplayEachGame'
                                        src={eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                                        alt=''
                                        onClick={() => routeToGame(eachGame.id)}>
                                    </img>
                                </div>
                                <div className='DisplaySecond'>
                                    <h2 className='DisplayEachGameName' onClick={() => routeToGame(eachGame.id)}> {eachGame.name} </h2>
                                </div>
                                <div className='DisplayThird'>
                                    {roundRating(eachGame.rating)}
                                </div>
                                <div className='DisplayFourth'>
                                    {convertReleaseDate(eachGame.first_release_date)}
                                </div>
                            </div>))
                    }
                </div>
                {
                    navState !== 'Recommendations' ? <div className='MoveDisplayPageButtonContainer'>
                        <button className='MoveDisplayPageButton' onClick={prevButton} disabled={
                            pageNumber === 1 ? true : false
                        }> {'< '}
                            Prev
                        </button>
                        {' | '}
                        <button className='MoveDisplayPageButton' onClick={nextButton} disabled={
                            nextData.length === 0 ? true : false
                        }>
                            Next {'>'}
                        </button>
                    </div> : null
                }
        </div>
    );
}
export default DisplayOptions;
