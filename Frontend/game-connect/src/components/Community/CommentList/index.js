import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { Comment } from '../';
import './CommentElements.css';
import axios from 'axios';

export default function CommentList({ postData, addComment, updateComment }) {
  /*MERGE TEST COMMENT*/
  const URL = '/backend/comments/';
  const { user } = useContext(AuthContext);
  const [commentData, setCommentData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextComments, setNextComments] = useState([]);
  const path = window.location.pathname;
  const postid = path.split("/")[2];
  const [reply, setReply] = useState({ body: '' })
  //const [newComment, setNewComment] = useState({});

  // Preload post data
  useEffect(() => {
    const source = axios.CancelToken.source();
    // Get post data for current page
    const getData = async () => {
      try {
        const res = await axios.get(URL + 'post/' + postid + "/" + pageNumber, {
          cancelToken: source.token,
        });
        setCommentData(res.data);
      }
      catch (error) {
        if (axios.isCancel(error)) {

        } else {
          console.log(error);
        }
      }
    };

    // Get post data for next page
    const getNextData = async () => {
      try {
        const nextPage = pageNumber + 1;
        const res = await axios.get(URL + 'post/' + postid + "/" + nextPage, {
          cancelToken: source.token,
        });
        setNextComments(res.data);
      }
      catch (error) {
        if (axios.isCancel(error)) {

        } else {
          console.log(error);
        }
      }
    };

    getData();
    getNextData();
    return () => {
      source.cancel();
    }
  }, [pageNumber, postid]);

  const goNext = () => {
    setPageNumber(pageNumber + 1);
  }

  const goBack = () => {
    setPageNumber(pageNumber - 1);
  }

  const changeHandler = (e) => {
    setReply({ ...reply, [e.target.name]: e.target.value })
  }

  // Add new comment to post; get username and user id
  const submitHandler = async (e) => {
    e.preventDefault()
    if (!reply.body) {
      alert("Comment cannot be blank");
      return;
    }
    const data = {
      community_id: postData.community_id,
      comment_content: reply.body,
      karma: 0,
      post_title: postData.title,
      post_id: postid,
      username: user
    };
    try {
      const res = await axios.post(URL, data);
      addComment(res.data);
      if (commentData.length === 15) setPageNumber(pageNumber + 1);
      else {
        const newComments = commentData.slice();
        newComments.push(res.data);
        setCommentData(newComments);
      }
      setReply({ body: '' });
    }
    catch (error) {
      console.log(error);
    }
  }

  const deleteComment = (comment_id) => {
    const newComments = commentData.filter((element) => element._id !== comment_id);;
    if (newComments.length === 0 && pageNumber > 1) goBack();
    else setCommentData(newComments);
    updateComment(comment_id);
  }

  // TODO: Add post request to update comment data
  const updateKarma = (e, comment_id) => {
    e.preventDefault();
    let copy = commentData;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id === comment_id) {
        copy[i].likes++;
        break;
      }
    }
    setCommentData(copy);
    //console.log(commentData);
  }

  return (
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

        {user !== null ? <button>submit</button> : <div className='warning'>You must be <Link to='/signin'>logged in</Link> to comment!</div>}
      </form>

      <div className="comments-container">
        <div>
          {
            commentData.map(comment => {
              return <Comment key={comment._id} comment={comment} updateKarma={updateKarma} deleteComment={deleteComment} />
            })
          }
        </div>
        {
          commentData.length === 0 ? <h1 className='nothing-here'>Nothing yet</h1> :
            <div className='bottom-container'>
              <button className='page-button' onClick={goBack} disabled={
                pageNumber === 1 ? true : false
              }>{'<'} Previous</button>
              {' | '}
              <button className='page-button' onClick={goNext} disabled={
                nextComments.length === 0 ? true : false
              }>Next {'>'}</button>
            </div>
        }
      </div>
    </>
  );
}