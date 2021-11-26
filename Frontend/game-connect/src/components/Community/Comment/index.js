import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

export default function Comment({comment, deleteComment}) {
    /*MERGE TEST COMMENT*/
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [click, setClickCount] = useState(0);
    
    // Delete comment
    const deleteHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete('/backend/comments/' + comment._id);
            deleteComment(comment._id);
        }
        catch (error) {
            console.log(error);
        }
    }

    // TODO: Update likes in comments
    const karmaHandler = (e) => {
        e.preventDefault();
        if(user === null) history.push(`/signin`);
        setClickCount(click+1);
    }

    return(
        <>
            <div className="comments" key={comment._id}>
                <div>
                    {/* <div className="upvote" onClick={e => { karmaHandler(e) }}>
                        <i className="fa fa-angle-up"></i>
                    </div> */}
                </div>

                <div>
                    <div>{comment.comment_content}</div>
                    {/* <div className="post-info">Likes: {comment.karma}</div> */}
                    <div className="post-info">By: {comment.username}
                        {comment.username === user ?
                            <span onClick={(e) => deleteHandler(e)} style={{ color: "#007BFD", cursor: "pointer" }}>
                                &nbsp;&nbsp;delete
                                </span> : null
                        }
                    </div>
                </div>
            </div> 
        </>
    );
}