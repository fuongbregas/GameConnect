import React from 'react';
import { PostList, Trending } from '../../components';
import './CommunityElements.css';

export default function Community() {
  return (
    <div className="content">
      {/* <PostList /> */}
      <Trending />
    </div>
  );
} 