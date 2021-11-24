import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

export default function Comment({comment, updateKarma, deleteComment}) {
    /*MERGE TEST COMMENT*/
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [del, setDelete] = useState(false);
    const [likecomment, setLikeComment] = useState(false);
    const [click, setClickCount] = useState(0);

    // Delete comment
    useEffect(() => {
        const deleteData = async () => {
            const res = await axios.delete('/backend/comments/' + comment._id);
            if(res.status === 200) deleteComment(comment._id);
        };
        if(del) deleteData();
    }, [del]);

    // Delete comment
    const deleteHandler = (e) => {
        e.preventDefault();
        setDelete(true);
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