import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from '../';
import './PostDetailElements.css';
import axios from 'axios';
import PostData from '../../../dummyData.json';

export default function PostDetail() {
    const [postData, setPostData] = useState({
        id: 0,
        title: "",
        body: "",
        likes: 0,
        subGameConnect: "",
        username: "",
        comments: []
    });
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

    return (
      <>
        <div className="postPage-container">
          <div className="post-container">
            <div className="post-details">
              <div className="like-container PostPage">
                  <div className="upvote-container">
                      <div className="upvote" >
                          <i className="fa fa-angle-up"></i>
                      </div>
                      <div className="downvote" >
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
                    Likes: {postData.likes}    Comments: {postData.comments.length}
                </div>
              </div>
            </div>
            <Comment />
          </div>
        </div>
      </>
    );
} 