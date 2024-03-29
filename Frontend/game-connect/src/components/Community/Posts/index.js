import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PostElements.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { AuthContext } from "../../../context/AuthContext";

export default function Posts({post,updateKarma,deletePost}) {

    /*MERGE TEST COMMENT*/
    const URL = '/backend/posts/';
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [click, setClickCount] = useState(0);
    const [userstatus, setUserStatus] = useState("");
    const [del, setDelete] = useState(false);
    const [comments, setComments] = useState([]);
    const [community, setCommunity] = useState([]);

    // Get comments
    useEffect(() => {
        const getData = async () => {
            let res = await axios.get('/backend/comments/' + post._id);
            if(res.status === 200) setComments(res.data);
            res = await axios.get('/backend/communities/' + (post.community_id).toString());
            if(res.status === 200) setCommunity(res.data);
        };
        getData();
    }, [user, post._id, post.community_id]);

    // Delete post and all related comments
    useEffect(() => {
        // Check if user already like post
        const checkData = async () => {
            const res = await axios.get(URL + 'karma/' + user + "/" + post._id);
            if(res.data === "Liked") setUserStatus("unlike");
            else if(res.data === "Unliked") setUserStatus("like");
        };
        const deleteData = async () => {
            const res = await axios.delete(URL + post._id);
            if(res.status === 200) deletePost(post._id);
        };
        if(click > 0) checkData();
        if(del) deleteData();
        // eslint-disable-next-line
    }, [click, del]);

    // Update karma of post
    useEffect(() => {
        const updateData = async () => {
            const header = {
                user: user,
                postID: post._id
            }
            const res = await axios.put(URL + 'karma/' + userstatus, header);
            if(res.status === 200) updateKarma(post._id, res.data.post);
        };
        if(userstatus === "like" || userstatus === "unlike") updateData();
        // eslint-disable-next-line
    }, [userstatus]);

    const karmaHandler = (e) => {
        e.preventDefault();
        if(user === null) history.push(`/signin`);
        setClickCount(click+1);
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        setDelete(true);
    }

    const readProfile = () => {
        history.push(`/profile/${post.username}`);
    }

    const postLinkHandler = () => {
        history.push(`/post/${post._id}`);
    }

    return (
        <div className="posts">
            <div className="post-sidebar">
                <ArrowUpwardIcon className="upvote" onClick={e => { karmaHandler(e) }}/>
                <span>{post.karma}</span>
            </div>
            <div className="post-title-main">
                <img src={`http://${community.cover}`} alt="community cover"/>
                <span className="subreddit-name">
                    <Link to={`/sub/${community.id}`} style={{textDecoration: "none"}}>
                        {community.name}
                    </Link>
                </span>
                <span className="post-user">Posted by</span>
                <span className="post-user underline" onClick={readProfile}>{post.username}</span>
                <div className="spacer"></div>
                {/* <div className="button primary-button">+ JOIN</div> */}
            </div>
            <div className="post-body">
                <span className="title" onClick={postLinkHandler}>{post.title}</span>
                {/* {post.image_URL && <img src={post.image_URL}/>} */}
                {post.post_content && <span className="description">{post.post_content}</span>}
            </div>
            <div className="post-footer">
                <div className="comment-main footer-action" onClick={postLinkHandler}>
                    <ModeCommentIcon className="comment-icon"/>
                    <span>{comments.length} Comments</span>
                </div>
                {post.username === user ?
                        <span onClick={(e) => deleteHandler(e)} style={{ color: "#007BFD", cursor: "pointer" }}>
                            &nbsp;&nbsp;delete
                            </span> : null
                }
            </div>
        </div>
    )
}