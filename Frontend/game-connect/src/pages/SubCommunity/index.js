import React from 'react';
import { Trending, MainBar, SideBar } from '../../components';
import './SubCommunityElements.css';
import { useParams } from 'react-router';

export default function SubCommunity() {
  const {id} = useParams();
  
  /* TEST COMMENT  */
    return (
      <div className="content">
      <Trending />
      <div className="bars-wrapper">
        <span className="popular-posts-title">Popular posts</span>
        <div className="bars-wrapper-inside">
          <MainBar type={"subcommunity"} id = {id}/>
          <SideBar />
        </div>
      </div>
    </div>
    );
} 
