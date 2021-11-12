import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import './GenreList.css';


const GenreList = () => {
    const [genreList, setGenreList] = useState([]);

    

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
            Genres
            {
                genreList.map((eachGenre) => (
                    <div className='GenreList' key={eachGenre.name}>
                        {eachGenre.name}
                    </div>
                    ))
            }


        </div>
    );

}

export default GenreList;