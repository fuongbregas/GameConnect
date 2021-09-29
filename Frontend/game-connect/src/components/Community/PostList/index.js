import React, { useState, useEffect } from 'react';
import { PostHeader } from '../';
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

  return (
    <>
      < div className="main-container" >
            <div className="posts-container">
              {threadData.map(post => {
                return <PostHeader key={post.id} post={post} upVoteHandler={upVoteHandler} downVoteHandler={downVoteHandler} />
              })}
            </div>
      </div>
    </>
  );
} 