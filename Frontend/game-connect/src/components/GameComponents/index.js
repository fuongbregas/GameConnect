import { React, useState } from 'react';
import './GameElements.css';
import { useParams } from 'react-router';
import {Route } from 'react-router-dom';
import Cover from './Cover/Cover';
import { NotFound } from '../../pages';
import GameInformation from './GameInformation/GameInformation';

const GameContainer = () => {
    const { gameID } = useParams();
    const [error, setError] = useState(null);
    return (
        <>
            {
                error === null ?
                    <div className='gamepage-container'>
                        <div className='cover'>
                            <Cover gameID={gameID} setError={setError} />
                        </div>
                        <div className='main'>
                            <GameInformation gameID={gameID} />
                        </div>
                    </div>
                : <Route component={NotFound} />
            }

        </>
    );
}

export default GameContainer;