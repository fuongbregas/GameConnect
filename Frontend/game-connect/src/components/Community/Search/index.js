import React, { useState } from 'react';
import './SearchElements.css';

export default function Search() {
    const [searchString, setSearchString] = useState('');

    const changeHandler = (e) => {
        setSearchString(e.target.value);
    }

    // TODO: Get search results
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(searchString);

        // axios.get('/api/post')
        //     .then(res => {
        //         props.getPosts(res.data)
        //         props.searchPosts(searchString)

        //     })
        //     .catch(err => console.log(err))
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setSearchString('');
    }

    return(
        <>
          <div className="search-container">
            <form >
                <input
                    type="text"
                    name="searchString"
                    value={searchString}
                    placeholder="Search Posts"
                    onChange={changeHandler}
                />
                <button onClick={submitHandler} className="search-button">
                    <i className="fa fa-search"></i>
                </button>
                <button onClick={clearSearch} className="search-button">
                    <i className="fa fa-window-close"></i>
                </button>
            </form>
          </div>
        </>
    );
}