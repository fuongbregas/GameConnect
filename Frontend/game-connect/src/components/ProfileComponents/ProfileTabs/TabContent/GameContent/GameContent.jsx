import {React} from 'react';
import { useHistory } from 'react-router';
import './GameContent.css';

const GameContent = ({data}) => {
    const history = useHistory();
    const handleClick = (gameID) => {
        history.push(`/game/${gameID}`);
    }

    return (
        <>
            {
                data.map((each_data, index) => (
                    <div key = {index} className = 'game' onClick={() => handleClick(each_data.id)}>
                        <img className = 'cover-picture' 
                             src = {each_data.cover !== '' ? 'https://' + each_data.cover : '/no_image.jpg'}
                             alt = ''/>
                        <h2 className = 'game-name'>{each_data.name}</h2>
                    </div>
            ))}
        </>
    );
};

export default GameContent;