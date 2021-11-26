import React from 'react';
import { Trending, MainBar, SideBar } from '../../components';
import './SubCommunityElements.css';

export default function SubCommunity() {
  
  /* TEST COMMENT  */
    return (
      <div className="content">
      <Trending />
      <div className="bars-wrapper">
        <span className="popular-posts-title">Popular posts</span>
        <div className="bars-wrapper-inside">
          <MainBar type={"subcommunity"}/>
          <SideBar />
        </div>
      </div>
    </div>
    );
} 
