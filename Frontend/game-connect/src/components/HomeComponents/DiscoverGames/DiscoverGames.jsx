import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import { useHistory } from 'react-router';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './DiscoverGames.css';

const DiscoverGames = () => {
    const [discoverGames, setDiscoverGames] = useState([]);
    const history = useHistory();

    const grabDiscoverGames = async() => {
        const res = await axios.get('/backend/game/get_rated_game');
        setDiscoverGames(res.data);
    }

    const handleClick = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    useEffect(() => {
        grabDiscoverGames();
    }, []);

    console.log('discoverGames:' + discoverGames);
    return(
        // <div className = 'DiscoverGames'>
        //     {
        //         discoverGames.map(eachGame =>
        //             <img className='DiscoverGamesList' key={eachGame.cover}
        //                 src={eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
        //                 alt=''
        //                 onClick={() => handleClick(eachGame.id)}>
        //             </img>)
        //     }
        // </div>
        <div className="DiscoverGamesContainer">
            <Carousel showThumbs = {false} autoPlay = {true} infiniteLoop = {true} showStatus = {false}
                stopOnHover = {true} interval={4500} useKeyboardArrows = {true}>
                {
                    discoverGames.map(eachGame => 
                    <div key={eachGame.cover} onClick={() => handleClick(eachGame.id)}>
                        <img className='SlideImages' key={eachGame.cover}
                            src = {eachGame.cover !== null ? 'https://' + eachGame.cover : '/no_image.jpg'}
                            alt = ''
                            />
                    </div>)
                }
            </Carousel>
        </div>
        
    );
}

export default DiscoverGames;