import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { Link } from 'react-router-dom';
import { CommentList } from '../';
import './PostDetailElements.css';
import axios from 'axios';

export default function PostDetail() {
    /*MERGE TEST COMMENT*/
    const { user } = useContext(AuthContext);
    const [postData, setPostData] = useState({});
    const [comments, setComments] = useState([]);
    const [community, setCommunity] = useState([]);
    const initial = true;
    const history = useHistory();
    const path = window.location.pathname;
    const postid = path.split("/")[2];
    const [click, setClickCount] = useState(0);
    const [userstatus, setUserStatus] = useState("");

    // Fetch single post and community data
    useEffect(() => {
        const fetchData = async () => {
        try {
            let res = await axios.get('/backend/posts/' + postid);
            setPostData(res.data);
            res = await axios.get('/backend/communities/' + (res.data.community_id).toString());
            if(res.status === 200) setCommunity(res.data);
        }
        catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }, [initial, postid]);

    // Get comments info
    useEffect(() => {
        const getCommentData = async () => {
            const res = await axios.get('/backend/comments/' + postid);
            if(res.status === 200) setComments(res.data);
        };
        getCommentData();
    }, [user, postid]);

    // Check if user already like post
    useEffect(() => {
        const checkData = async () => {
            const res = await axios.get('/backend/posts/karma/' + user + "/" + postData._id);
            if(res.data === "Liked") setUserStatus("unlike");
            else if(res.data === "Unliked") setUserStatus("like");
        };
        if(click > 0) checkData();
    }, [click, user, postData._id]);

    // Update karma of post
    useEffect(() => {
        const updateData = async () => {
            const header = {
                user: user,
                postID: postData._id
            }
            const res = await axios.put('/backend/posts/karma/' + userstatus, header);
            if(res.status === 200) setPostData(res.data.post);
        };
        if(userstatus === "like" || userstatus === "unlike") updateData();
    }, [userstatus, user, postData._id]);

    // Display karma update
    const karmaHandler = (e) => {
        e.preventDefault();
        if(user === null) history.push(`/signin`);
        setClickCount(click+1);
    }

    // Add comment to post
    const addComment = (comment) => {
        const newComments = comments.slice();
        newComments.push(comment);
        setComments(newComments);
    }

    // Delete comment
    const updateComment = (comment_id) => {
        const newComments = comments.filter((element) => element._id !== comment_id);
        setComments(newComments);
    }

    return (
      <>
        <div className="postPage-container">
          <div className="post-container">
            <div className="post-details">
              <div className="like-container PostPage">
                  <div className="upvote-container">
                      <div className="upvote" onClick={e => { karmaHandler(e) }}>
                          <i className="fa fa-angle-up"></i>
                      </div>
                  </div>
                  <div style={{ color: "#0000FF" }}>{postData.title}</div>
              </div>
 
              <div>
                <div className="post-body">{postData.post_content}</div>
                <div className="post-info">
                    Posted By: {postData.username} on <br />
                    <span style={{ color: "#007BFD", cursor: "pointer" }}>
                        <Link to={`/sub/${community.name}`}>
                            {community.name}
                        </Link>
                    </span>
                </div>
                <div className="post-info">
                    Likes: {postData.karma} Comments: {comments.length}
                </div>
              </div>
            </div>
            <CommentList postData={postData} addComment={addComment} updateComment={updateComment} />
          </div>
        </div>
      </>
    );
} 