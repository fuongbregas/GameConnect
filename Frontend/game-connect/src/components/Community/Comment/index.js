import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

export default function Comment({comment, upVoteHandler, downVoteHandler, deleteComment}) {
    const {user} = useContext(AuthContext);
    // TEST: comment previous line, uncomment next line
    //const user = "userA";
    const [vote, setVote] = useState(0);
    const history = useHistory();

    // TODO: Update likes in comments
    const updateLikes = (e, action) => {
        // TEST: comment next line
        if(user === null) history.push(`/signin`);
        switch(action) {
            case 1:
                if(vote === 0) {
                    upVoteHandler(e, comment.id);
                    setVote(1);
                } 
                break;
            case 2:
                if(vote === 1) {
                    downVoteHandler(e, comment.id, comment.likes);
                    setVote(0);
                } 
                break;
            default: break;
        }
    }

    // TODO: Delete comment
    const deleteHandler = (e, comment_id) => {
        e.preventDefault();
        deleteComment(comment_id);
    }

    return(
        <>
            <div className="comments" key={comment.id}>
                <div>
                    <div className="upvote" onClick={e => { updateLikes(e,1) }}>
                        <i className="fa fa-angle-up"></i>
                    </div>
                    <div className="downvote" onClick={e => { updateLikes(e,2) }}>
                        <i className="fa fa-angle-down"></i>
                    </div>
                </div>

                <div>
                    <div>{comment.body}</div>
                    <div className="post-info">Likes: {comment.likes}</div>
                    <div className="post-info">By: {comment.username}
                        {comment.username === user ?
                            <span onClick={(e) => deleteHandler(e, comment.id)} style={{ color: "#007BFD", cursor: "pointer" }}>
                                &nbsp;&nbsp;delete
                                </span> : null
                        }
                    </div>
                </div>
            </div> 
        </>
    );
}