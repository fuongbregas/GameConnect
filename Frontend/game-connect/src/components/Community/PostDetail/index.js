import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { Link } from 'react-router-dom';
import { CommentList } from '../';
import './PostDetailElements.css';
import axios from 'axios';
import PostData from '../../../dummyData.json';

export default function PostDetail() {
    const { user } = useContext(AuthContext);
    const [postData, setPostData] = useState({
        id: 0,
        title: "",
        body: "",
        likes: 0,
        subGameConnect: "",
        username: "",
        comments: []
    });
    const [vote, setVote] = useState(0);
    const initial = true;
    const history = useHistory();

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
                    setPostData(post);
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

    // TODO: Add post request to update community data
    const updateLikes = (e, action) => {
        //if(user === null) history.push(`/signin`);
        switch(action) {
            case 1:
                if(vote === 0) {
                    setPostData({...postData, likes: postData.likes + 1});
                    setVote(1);
                } 
                break;
            case 2:
                if(vote === 1) {
                    setPostData({...postData, likes: postData.likes - 1});
                    setVote(0);
                } 
                break;
            default: break;
        }
        console.log(postData.comments);
    }

    // TODO: Add comment to post
    const addComment = (data) => {
        setPostData({...postData, comments: postData.comments.concat(data)});
        console.log(postData);
    }

    // TODO: Delete comment
    const updateComment = (comment_id) => {
        const items = postData.comments;
        setPostData({...postData, comments: items.filter(item => item.id !== comment_id)});
        console.log(postData);
    }

    return (
      <>
        <div className="postPage-container">
          <div className="post-container">
            <div className="post-details">
              <div className="like-container PostPage">
                  <div className="upvote-container">
                      <div className="upvote" onClick={e => { updateLikes(e,1) }}>
                          <i className="fa fa-angle-up"></i>
                      </div>
                      <div className="downvote" onClick={e => { updateLikes(e,2) }}>
                          <i className="fa fa-angle-down"></i>
                      </div>

                  </div>
                  <div style={{ color: "#0000FF" }}>{postData.title}</div>
              </div>
 
              <div>
                <div className="post-body">{postData.body}</div>
                <div className="post-info">
                    Posted By: {postData.username} on sub:
                    <span style={{ color: "#007BFD", cursor: "pointer" }}>
                        <Link to={`/sub/${postData.subGameConnect}`}>
                            /sub/{postData.subGameConnect}
                        </Link>
                    </span>
                </div>
                <div className="post-info">
                    Likes: {postData.likes} Comments: {postData.comments.length}
                </div>
              </div>
            </div>
            <CommentList post_id={postData.id} addComment={addComment} updateComment={updateComment}/>
          </div>
        </div>
      </>
    );
} 