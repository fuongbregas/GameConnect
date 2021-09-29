import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import './CommentElements.css';
import axios from 'axios';
import PostData from '../../../dummyData.json';

export default function Comment() {
    const { user } = useContext(AuthContext);
    const [commentData, setCommentData] = useState([]);
    const initial = true;

    // TODO: fetch single post data
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
                        return <div className="comments" key={comment.id}>
                        <div>
                            <div className="upvote">
                                <i className="fa fa-angle-up"></i>
                            </div>
                            <div className="downvote">
                                <i className="fa fa-angle-down"></i>
                            </div>
                        </div>
      
                        <div>
                            <div>{comment.body}</div>
                            <div className="post-info">Likes: {comment.likes}</div>
                            <div className="post-info">By: {comment.username}</div>
                        </div>
                      </div>
                    })
                }
              </div>
          </div>
        </>
    );
}