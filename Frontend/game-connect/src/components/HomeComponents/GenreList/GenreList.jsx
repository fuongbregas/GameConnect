import { React, useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import './GenreList.css';

const GenreList = () => {
    const [genreList, setGenreList] = useState([]);
    const history = useHistory();

    const handleClick = (genreID) => {
        history.push(`/genre/${genreID}`);
    }

    useEffect(() => {
        const grabGenreList = async() => {
            const res = await axios.get('/backend/game/genres');
            setGenreList(res.data);
        }
        grabGenreList();
    }, [])

    console.log('genreList: ' + genreList);
    return(
        <div className="GenreListBox">
            Browse by Genres
            {
                genreList.map((eachGenre) => (
                    <div className='GenreList' key={eachGenre.name} onClick={() => handleClick(eachGenre.id)}>
                        {eachGenre.name}
                    </div>
                ))
            }
        </div>
    );

}

export default GenreList;