import {React, useState, useEffect} from 'react';
import axios from 'axios';
import './MainBarElements.css';
import {FaTimes} from 'react-icons/fa';
import WhatsHot from '@material-ui/icons/Whatshot';
import NewReleases from '@material-ui/icons/NewReleases';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Menu from '@material-ui/icons/Menu';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import {Posts, AddPost} from '../';

export default function MainBar({type}) {

    const URL = '/backend/posts/';
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [nextPosts, setNextPosts] = useState([]);
    const [filter, setFilter] = useState(1);

    // Preload post data
    useEffect(() => {
        // Get post data for current page
        const getData = async () => {
            const res = await axios.get(URL + getURL() + pageNumber);
            setPosts(res.data);
        };
        // Get post data for next page
        const getNextData = async () => {
            const nextPage = pageNumber + 1;
            const res = await axios.get(URL + getURL() + nextPage);
            setNextPosts(res.data);
        };
        getData();
        getNextData();
    }, [pageNumber]);

    const getURL = () => {
        if(type === "subcommunity") {
            const path = window.location.pathname;
            const communityid = path.split("/")[2];
            return 'post/' + communityid.toString() + "/";  
        }
        let url = "";
        switch(filter) {
            case 1:
                url = 'post/'; 
                break;
            case 2: 
                url = 'game/'; 
                break;
            case 3:
                url = 'karma/';  
                break;
            default: break;
        }
        return url;
    }

    const typeCheck = () => {
        if(type === "subcommunity") {
            const path = window.location.pathname;
            const communityid = path.split("/")[2];
            return communityid.toString() + "/";
        } else return '';
    }

    const goNext = () => {
        setPageNumber(pageNumber + 1);
    }

    const goBack = () => {
        setPageNumber(pageNumber - 1);
    }

    const updateKarma = (post_id, newPost) => {
        const newPosts = [...posts];
        const index = newPosts.findIndex((element) => element._id === post_id);
        newPosts[index] = newPost;
        setPosts(newPosts);
    }

    const deletePost = (post_id) => {
        const newPosts = posts.filter((element) => element._id !== post_id);
        if(newPosts.length === 0 && pageNumber > 1) goBack();
        else setPosts(newPosts);
    }

    const changeFilter = (e, id) => {
        e.preventDefault();
        setFilter(id);
        setPosts([]);
        setNextPosts([]);
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
                    <img src="pin.jpg"/>
                </div>
            </div>

            <AddPost id={typeCheck()}/>

            {typeCheck() === "" &&
            <div className="filter-container">
                 <div className="filter-element hoverable" onClick={e => {changeFilter(e,1)}}>
                    <NewReleases />
                    <span>New</span>
                </div>
                <div className="filter-element-secondary hoverable" onClick={e => {changeFilter(e,2)}}>
                    <WhatsHot />
                    <span>Hot</span>
                </div>
                <div className="filter-element-secondary hoverable" onClick={e => {changeFilter(e,3)}}>
                    <TrendingUp />
                    <span>Top</span>
                </div>
                <div className="spacer"></div>
                <div className="filter-element-menu hoverable">
                    <Menu />
                    <ArrowDropDown />
                </div>
            </div>
            }

            <div className="posts-wrapper">
                {posts.map(post => {
                    return <Posts key={post._id} post={post} updateKarma={updateKarma} deletePost={deletePost}/>
                })}
            </div>
            {
                posts.length === 0 ? <h1 className = 'nothing-here'>Nothing yet</h1> :
                <div className = 'bottom-container'>
                    <button className = 'page-button' onClick={goBack} disabled = {
                                pageNumber === 1 ? true : false
                            }>{'<'} Previous</button>
                    {' | '}
                    <button className = 'page-button' onClick={goNext} disabled = {
                                nextPosts.length === 0 ? true : false
                            }>Next {'>'}</button>
                </div>
            }
        </div>
    )
}