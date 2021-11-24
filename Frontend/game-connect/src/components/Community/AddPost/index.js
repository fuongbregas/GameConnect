import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './AddPostElements.css';
import { AuthContext } from "../../../context/AuthContext";

export default function AddPost({id}) {

    /*MERGE TEST COMMENT*/
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const postHandler = (e) => {
        e.preventDefault();
        if(user !== null) history.push('/postform/' + postID());
        else history.push(`/signin`);
    }

    const postID = () => {
        if(id !== '') {
            id = id.substring(0, id.length - 1);
        } else {
            id = 0;
        }
        return id;
    }

    return (
        <div className="post-container">
            <input type="text" placeholder="Create Post" onClick={postHandler}/>
        </div>
    )
}