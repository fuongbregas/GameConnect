import {React} from 'react';
import Save from './Save/Save';
import Unsave from './Unsave/Unsave';

const Button = ({gameStatus, gameID, setGameStatus}) => {
    return (
        <>
            {
                gameStatus === 'Unsaved' ? <Save gameID={gameID} setGameStatus={setGameStatus}/>
                : <Unsave gameID={gameID} setGameStatus={setGameStatus}/>
            }
        </>
    );
}

export default Button;