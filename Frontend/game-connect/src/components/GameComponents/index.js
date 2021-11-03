import {React} from 'react';
import './GameElements.css';
import {useParams} from 'react-router';
import Cover from './Cover/Cover';
const GameContainer = () => {
    const {gameID} = useParams();
    return (
        <div className = 'container'>
            <div className = 'cover'>
                <Cover gameID={gameID}/>
            </div>

            <div className = 'main'>

            </div>
        </div>
    );
}

export default GameContainer;