import React, { useState , useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import './PostFormElements.css';

export default function PostForm() {
    const history = useHistory();
    const [post, setPost] = useState({ title: '', body: '', subGameConnect_id: '', user_id: null });
    const [postValid, setPostValid] = useState(true);

    const { user } = useContext(AuthContext);
    // TEST: comment previous line, uncomment next line
    //const user = "userA";

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!post.title || !post.body || !post.subGameConnect_id) {
            alert("All fields must be filled");
            return
        }

        //search if subcommunity exists

        //check if post is valid
        const tempPost = { ...post, subGameConnect_id: 1, user_id: 1 };
        fetchData(tempPost);
    }

    // TODO: update database with new post
    const fetchData = (tempPost) => {
        history.push("/community");
    }

    return(
        <>
            <div className="postForm-container">
                <form className="postForm" onSubmit={submitHandler}>
                    <div className="createPost">Create a new post</div>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={post.title}
                        placeholder="Enter title"
                        onChange={changeHandler}
                    />
                    <textarea
                        id="body"
                        name="body"
                        className="postForm-body"
                        type="textarea"
                        value={post.body}
                        placeholder="Enter body"
                        onChange={changeHandler}
                    />
                    <input
                        id="subGameConnect_id"
                        name="subGameConnect_id"
                        type="text"
                        value={post.subGameConnect_id}
                        placeholder="Enter a subcommunity"
                        onChange={changeHandler}
                    />
                    {postValid === false ? <div className="err-msg">Please enter a title, body and a valid subreadit</div> : null}
                    {user !== null ?
                        <button className="postForm-button">
                            submit
                        </button> : <div className="err-msg">You need to be <Link to='/login'>logged in</Link> to post</div>
                    }
                </form>
            </div>
        </>
    );
}