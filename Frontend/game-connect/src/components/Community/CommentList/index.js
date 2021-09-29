import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { Comment } from '../';
import './CommentElements.css';
import axios from 'axios';
import PostData from '../../../dummyData.json';

export default function CommentList() {
    const { user } = useContext(AuthContext);
    const [commentData, setCommentData] = useState([]);
    const initial = true;

    // TODO: fetch comment data
    useEffect(() => {
        const fetchData = async () => {
        try {
            // const response = await axios.get('/backend/game_data');
            // let data = response.gameData;
            // console.log("Test \n" + JSON.stringify(response));
            const path = window.location.pathname;
            const id = parseInt(path.split("/").pop());
            for(let i = 0; i < PostData.length; i++) {
                let post = PostData[i];
                if(post.id === id) {
                    setCommentData(post.comments);
                    console.log(commentData);
                    break;
                }
            }  
        }
        catch (err) {
            console.log(err);
        }
        };
        fetchData();
        // eslint-disable-next-line 
    }, [initial]);

    // TODO: Add post request to update comment data
    const upVoteHandler = (e, comment_id) => {
        e.preventDefault();
        let copy = commentData;
        for(let i = 0; i < copy.length; i++) {
          if(copy[i].id === comment_id) {
            copy[i].likes++;
            break;
          }
        }
        setCommentData(copy);
        console.log(commentData);
    }

    // TODO: Add post request to update comment data
    const downVoteHandler = (e, comment_id, comment_likes) => {
        e.preventDefault();
        let copy = commentData;
        for(let i = 0; i < copy.length; i++) {
          if(copy[i].id === comment_id && comment_likes > 0) {
            copy[i].likes--;
            break;
          }
        }
        setCommentData(copy);
        console.log(commentData);
    }

    return(
        <>
          <form className="reply-container">
            <p>Submit a comment</p>
            <input
                id="body"
                type="textarea"
                name="body"
            />

            {user !== null ? <button>submit</button> : <div className='warning'>You must be <Link to='/signin'>logged in</Link> to comment!</div>}
            {/* <button>submit</button> 
            <div className='warning'>You must be <Link to='/signin'>logged in</Link> to comment!</div> */}
          </form>
          
          <div className="comments-container">
              <div>
                {
                    commentData.map(comment => {
                        return <Comment key={comment.id} comment={comment} upVoteHandler={upVoteHandler} downVoteHandler={downVoteHandler} />
                    })
                }
              </div>
          </div>
        </>
    );
}