import React from 'react';
import './PostElements.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import posts from '../../../data/posts.json';

export default function Posts() {
    return (
        <div className="posts-wrapper">
            {posts.map((post, index) => (
              <div className="posts">
                  <div className="post-sidebar">
                      <ArrowUpwardIcon className="upvote"/>
                      <span>{post.upvotes}</span>
                      <ArrowDownwardIcon className="downvote"/>
                  </div>
                  <div className="post-title">
                      <img src="favicon.ico"/>
                      <span className="subreddit-name">{post.subreddit.name}</span>
                      <span className="post-user">Posted by</span>
                      <span className="post-user underline">{post.username}</span>
                      <div className="spacer"></div>
                      <div className="button primary-button">+ JOIN</div>
                  </div>
                  <div className="post-body">
                      <span className="title">{post.title}</span>
                      {/* {post.image_src && <img src={post.image_src}/>} */}
                      {post.description && <span className="description">{post.description}</span>}
                  </div>
                  <div className="post-footer">
                      <div className="comment footer-action">
                          <ModeCommentIcon className="comment-icon"/>
                          <span>{post.comments} Comments</span>
                      </div>
                  </div>
              </div>  
            ))}
            
        </div>
    )
}