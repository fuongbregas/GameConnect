import React from 'react';
import { Trending, MainBar, SideBar } from '../../components';
import './CommunityElements.css';

export default function Community() {
  
  /* TEST COMMENT  */
  return (
    <div className="content">
      <Trending />
      <div className="bars-wrapper">
        <span className="popular-posts-title">Popular posts</span>
        <div className="bars-wrapper-inside">
          <MainBar type={"community"}/>
          <SideBar />
        </div>
      </div>
    </div>
  );
} 