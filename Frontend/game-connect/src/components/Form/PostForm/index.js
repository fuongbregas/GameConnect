import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext";
import './PostFormElements.css';

export default function PostForm() {
    /*MERGE TEST COMMENT*/
    const { user } = useContext(AuthContext);
    const history = useHistory();
    
    const {id} = useParams();
    const [err, setError] = useState("");
    const [post, setPost] = useState({ 
        title: '', 
        post_content: '', 
        community_id: parseInt(id), 
        username: user,
        karma: 0,
        image_URL: "" 
    });

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!post.title || !post.post_content ) {
            setError("Please enter a title, body");
            return
        }
        else {
            try {
                const res = await axios.post('/backend/posts', post);
                history.push(`/post/${res.data._id}`);
            }
            catch (error) {
                console.log(error);
            }
        }
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
                        placeholder="Enter post title"
                        onChange={changeHandler}
                    />
                    <textarea
                        id="post_content"
                        name="post_content"
                        className="postForm-body"
                        type="textarea"
                        value={post.post_content}
                        placeholder="Enter post content"
                        onChange={changeHandler}
                    />
                    <input
                        id="image_URL"
                        name="image_URL"
                        type="text"
                        value={post.image_URL}
                        placeholder="Insert a imgur link"
                        onChange={changeHandler}
                    />
                    {err && <div className="err-msg">{err}</div>}
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