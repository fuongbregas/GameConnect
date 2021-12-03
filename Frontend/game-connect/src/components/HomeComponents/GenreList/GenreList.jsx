import { React, useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import './GenreList.css';

const GenreList = () => {
    const [genreList, setGenreList] = useState([]);
    const history = useHistory();

    const handleClick = (genreID, genreName) => {
        history.push(`/genre/${genreID}/${genreName}`);
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        const grabGenreList = async() => {
            try {
                const res = await axios.get('/backend/game/genres', {
                    cancelToken: source.token,
                });
            setGenreList(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        }
        grabGenreList();

        return () => {
            source.cancel();
        }
    }, [])

    return(
        <div className="GenreListBox">
            <h3 className='BrowseByGenreHeading'>Browse by Genres</h3>
            {
                genreList.map((eachGenre) => (
                    <div className='GenreList' key={eachGenre.name} onClick={() => handleClick(eachGenre.id, eachGenre.name)}>
                        {eachGenre.name}
                    </div>
                ))
            }
        </div>
    );

}

export default GenreList;