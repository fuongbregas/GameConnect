import React, { useState, useEffect } from 'react';
import { PostHeader, Search } from '../';
import './PostListElements.css';
import axios from 'axios';
import PostData from '../../../dummyData.json';

export default function PostList() {
  const [threadData, setThreadData] = useState([]);
  const initial = true;

  // TODO: fetch community data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('/backend/game_data');
        // let data = response.gameData;
        // console.log("Test \n" + JSON.stringify(response));
        setThreadData(PostData);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line 
  }, [initial]);


  // TODO: Add post request to update community data
  const upVoteHandler = (e, post_id) => {
    e.preventDefault();
    let copy = threadData;
    for(let i = 0; i < copy.length; i++) {
      if(copy[i].id === post_id) {
        copy[i].likes++;
        break;
      }
    }
    setThreadData(copy);
    console.log(threadData);
  }

  // TODO: Add post request to update community data
  const downVoteHandler = (e, post_id, post_likes) => {
    e.preventDefault();
    let copy = threadData;
    for(let i = 0; i < copy.length; i++) {
      if(copy[i].id === post_id && post_likes > 0) {
        copy[i].likes--;
        break;
      }
    }
    setThreadData(copy);
    console.log(threadData);
  }

  // TODO: Delete post
  const deletePost = (post_id) => {
    const items = threadData;
    setThreadData(items.filter(item => item.id !== post_id));
    console.log(threadData);
  }

  // TODO: Create post
  // PLACEHOLDER
  const createPost = () => {
    let index = (threadData.length !== 0) ? threadData[threadData.length - 1].id : 0;
    const data = {
      id: index+1,
      title: "Greetings",
      body: "Body test",
      likes: 0,
      user_id: 1,
      subGameConnect_id: 1,
      subGameConnect: "threadA",
      username: "userA",
    };
    setThreadData(threadData.concat(data));
    console.log(threadData);
  }

  return (
    <>
      <div className="search">
        <button className="post-button">Create Post</button>
        <Search />
      </div>
      < div className="main-container" >
            <div className="posts-container">
              {threadData.map(post => {
                return <PostHeader key={post.id} post={post} upVoteHandler={upVoteHandler} downVoteHandler={downVoteHandler} deletePost={deletePost}/>
              })}
            </div>
      </div>
    </>
  );
} 