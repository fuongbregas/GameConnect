import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { Comment } from '../';
import './CommentElements.css';
import axios from 'axios';
import PostData from '../../../dummyData.json';

export default function CommentList({post_id, addComment, updateComment}) {
    const { user } = useContext(AuthContext);
    const [commentData, setCommentData] = useState([]);

    // TODO: Get id of current user
    // PLACEHOLDER: user_id
    const [reply, setReply] = useState({ body: '', user_id: 1, post_id: post_id })
    const initial = true;

    const changeHandler = (e) => {
      setReply({ ...reply, [e.target.name]: e.target.value })
    }

    // TODO: Add new comment to post; get username
    // PLACEHOLDER: username
    const submitHandler = (e) => {
      e.preventDefault()
      if (!reply.body) {
          alert("Comment cannot be blank");
          return
      }
      let index = commentData[commentData.length - 1].id;
      const data = {
        id: index+1,
        body: reply.body,
        likes: 0,
        user_id: reply.user_id,
        post_id: reply.post_id,
        username: "userA"
      };
      console.log(data);
      setCommentData([...commentData, data]);
      console.log(commentData);
      addComment(data);
    }

    // TODO: Delete comment
    const deleteComment = (comment_id) => {
        const items = commentData;
        setCommentData(items.filter(item => item.id !== comment_id));
        updateComment(comment_id);
    }

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
        //console.log(commentData);
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
        //console.log(commentData);
    }

    return(
        <>
          <form className="reply-container" onSubmit={submitHandler}>
            <p>Submit a comment</p>
            <input
                id="body"
                type="textarea"
                name="body"
                value={reply.body}
                onChange={changeHandler}
            />

            {/* {user !== null ? <button>submit</button> : <div className='warning'>You must be <Link to='/signin'>logged in</Link> to comment!</div>} */}
            <button>submit</button> 
            {/* <div className='warning'>You must be <Link to='/signin'>logged in</Link> to comment!</div> */}
          </form>
          
          <div className="comments-container">
              <div>
                {
                    commentData.map(comment => {
                        return <Comment key={comment.id} comment={comment} upVoteHandler={upVoteHandler} downVoteHandler={downVoteHandler} deleteComment={deleteComment} />
                    })
                }
              </div>
          </div>
        </>
    );
}