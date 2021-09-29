import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

export default function PostHeader({post, upVoteHandler, downVoteHandler}) {
    const { user } = useContext(AuthContext);
    const [counter, setCounter] = useState(0);
    const [vote, setVote] = useState(0);

    const history = useHistory();

    const postLinkHandler = (post_id) => {
        history.push(`/post/${post_id}`);
    }

    const subLinkHandler = (name) => {
        history.push(`/sub/${name}`);
    }

    const updateLikes = (e, action) => {
        //if(user === null) history.push(`/signin`);
        switch(action) {
            case 1:
                if(vote === 0) {
                    upVoteHandler(e, post.id);
                    setVote(1);
                } 
                break;
            case 2:
                if(vote === 1) {
                    downVoteHandler(e, post.id, post.likes);
                    setVote(0);
                } 
                break;
            default: break;
        }
        setCounter(counter + 1);
    }

    const styleColor = {
        color: "#007BFD",
        cursor: "pointer"
    }

    return(
        <>
          <div className="post" >
            <div className="like-container">
                <div className="upvote" onClick={e => { updateLikes(e,1) }}>
                    <i className="fa fa-angle-up"></i>
                </div>
                <div className="downvote" onClick={e => { updateLikes(e,2) }}>
                    <i className="fa fa-angle-down"></i>
                </div>
            </div>

            <div>
                <div onClick={() => postLinkHandler(post.id)} style={{ color: "#0000FF", cursor: "pointer" }} >{post.title}</div>
                <div className="post-info">
                    Posted By:
                <span> {post.username}</span> on sub: <span onClick={() => subLinkHandler(post.subGameConnect)} style={styleColor}>/sub/{post.subGameConnect}</span>
                </div>
                <div className="post-info">Likes: {post.likes}</div>
            </div>
          </div>
        </>
    );
}