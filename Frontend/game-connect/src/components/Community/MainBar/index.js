import React from 'react';
import './MainBarElements.css';
import {FaTimes} from 'react-icons/fa';
import WhatsHot from '@material-ui/icons/Whatshot';
import NewReleases from '@material-ui/icons/NewReleases';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Menu from '@material-ui/icons/Menu';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import posts from '../../../data/posts.json';
import {Posts, AddPost} from '../';

export default function MainBar() {

    const updateKarma = () => {

    }

    return (
        <div className="main-bar">
            <div className="update-card">
                <div className="top-section">
                    <span>UPDATES FROM GameConnect</span>
                    <FaTimes className="hoverable" />
                </div>
                <div className="body">
                    <div className="context">
                        <span className="title">Keep yourself safe and informed</span>
                        <br />
                        <span className="description">The only way to play games at your best is to stay healthy. More fun for you and everyone!</span>
                    </div>
                    <img src="/assets/images/pin.jpg"/>
                </div>
            </div>

            <AddPost />

            <div className="filter-container">
                <div className="filter-element hoverable">
                    <WhatsHot />
                    <span>Hot</span>
                </div>
                <div className="filter-element-secondary hoverable">
                    <NewReleases />
                    <span>New</span>
                </div>
                <div className="filter-element-secondary hoverable">
                    <TrendingUp />
                    <span>Top</span>
                </div>
                <div className="spacer"></div>
                <div className="filter-element-menu hoverable">
                    <Menu />
                    <ArrowDropDown />
                </div>
            </div>
            <div className="posts-wrapper">
                {posts.map(post => {
                    return <Posts key={post.post_id} post={post} updateKarma={updateKarma}/>
                })}
            </div>
        </div>
    )
}