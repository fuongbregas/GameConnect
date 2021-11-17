import React from 'react';
import { useHistory } from 'react-router-dom';
import './AddPostElements.css';

export default function AddPost() {

    const history = useHistory();

    const postHandler = (e) => {
        e.preventDefault();
        history.push('/postform');
    }

    return (
        <div className="post-container">
            <input type="text" placeholder="Create Post" onClick={postHandler}/>
        </div>
    )
}