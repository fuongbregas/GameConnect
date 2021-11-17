import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './PostElements.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { AuthContext } from "../../../context/AuthContext";

export default function Posts({post,updateKarma}) {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [upvotes, setUpvotes] = useState(false);

    const karmaHandler = (e) => {
        e.preventDefault();
        if(user === null) history.push(`/signin`);
        updateKarma();
        setUpvotes(!upvotes);
    }

    const readProfile = () => {
        history.push(`/profile/${post.username}`);
    }

    const postLinkHandler = () => {
        history.push(`/post/${post.post_id}`);
    }

    return (
        <div className="posts">
            <div className="post-sidebar">
                <ArrowUpwardIcon className="upvote" onClick={e => { karmaHandler(e) }}/>
                <span>{post.karma}</span>
            </div>
            <div className="post-title-main">
                <img src="favicon.ico"/>
                <span className="subreddit-name">{post.community.name}</span>
                <span className="post-user">Posted by</span>
                <span className="post-user underline" onClick={readProfile}>{post.username}</span>
                <div className="spacer"></div>
                {/* <div className="button primary-button">+ JOIN</div> */}
            </div>
            <div className="post-body">
                <span className="title" onClick={postLinkHandler}>{post.title}</span>
                {/* {post.image_src && <img src={post.image_src}/>} */}
                {post.post_content && <span className="description">{post.post_content}</span>}
            </div>
            <div className="post-footer">
                <div className="comment-main footer-action" onClick={postLinkHandler}>
                    <ModeCommentIcon className="comment-icon"/>
                    <span>{post.comments} Comments</span>
                </div>
            </div>
        </div>
    )
}