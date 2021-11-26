import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Select from 'react-select';
import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext";
import './PostFormElements.css';

export default function PostForm() {
    /*MERGE TEST COMMENT*/
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const path = window.location.pathname;
    const postid = path.split("/")[2];
    const [post, setPost] = useState({ 
        title: '', 
        post_content: '', 
        community_id: parseInt(postid), 
        username: user,
        karma: 0,
        image_URL: "" 
    });
    const [createPost, setCreatePost] = useState(0);
    const [err, setError] = useState("");

    // Create Post
    useEffect(() => {
        // Check if community id is valid
        const checkData = async () => {
            // const res = await axios.get('/backend/communities/search/' + (post.community_id).toString());
            // console.log(res.data);
            const res = await axios.get('/backend/communities/' + (post.community_id).toString());
            if(res.data !== null) createData();
            else setError("Invalid community");
            setPost({
                title: '', 
                post_content: '', 
                community_id: parseInt(postid), 
                username: user,
                karma: 0,
                image_URL: "" 
            });
        };
        const createData = async () => {
            const res = await axios.post('/backend/posts', post);
            if(res.status === 200) history.push(`/post/${res.data._id}`);
        };
        if(createPost > 0) checkData();
        // eslint-disable-next-line
    }, [createPost]);

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!post.title || !post.post_content || !post.community_id) {
            setError("Please enter a title, body and a valid community");
            return
        }
        setCreatePost(createPost+1);
    }

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

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
                        id="community_id"
                        name="community_id"
                        type="text"
                        value={post.community_id}
                        placeholder="Enter a game community"
                        onChange={changeHandler}
                    />
                    {/* <Select options={options} /> */}
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