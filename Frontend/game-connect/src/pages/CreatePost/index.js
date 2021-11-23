import React from 'react';
import { PostForm } from '../../components';
import './CreatePost.css';

export default function CreatePost() {
    return(
        <>
            <div className="create-post-page">
                <PostForm />
            </div>
        </>
    );
}