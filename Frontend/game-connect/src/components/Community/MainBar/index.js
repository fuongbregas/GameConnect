import {React, useState, useEffect} from 'react';
import axios from 'axios';
import './MainBarElements.css';
import { useParams, } from 'react-router';
import WhatsHot from '@material-ui/icons/Whatshot';
import NewReleases from '@material-ui/icons/NewReleases';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Menu from '@material-ui/icons/Menu';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import {Posts, AddPost} from '../';

export default function MainBar({type}) {
    const {id} = useParams();
    const URL = '/backend/posts/';
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [nextPosts, setNextPosts] = useState([]);
    const [filter, setFilter] = useState(1);

    // Preload post data
    useEffect(() => {
        // Get full path of api
        const getURL = () => {
            if(type === "subcommunity") {
                //const path = window.location.pathname;
                //const communityid = path.split("/")[2];
                return 'post/' + id + "/";  
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
        // Get post data for current page
        const getData = async () => {
            try {
                const res = await axios.get(URL + getURL() + pageNumber);
                setPosts(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        // Get post data for next page
        const getNextData = async () => {
            try {
                const nextPage = pageNumber + 1;
                const res = await axios.get(URL + getURL() + nextPage);
                setNextPosts(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        getData();
        getNextData();
    }, [pageNumber, filter, type, id]);

    const typeCheck = () => {
        if(type === "subcommunity") {
            return id;
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
        updateFilter(id);
        setPosts([]);
        setNextPosts([]);
    }

    const updateFilter = id => {
        const options = document.querySelectorAll('.filter');
        options[id - 1].classList.add('filter-element');
        options[id - 1].classList.remove('filter-element-secondary');
        options[filter - 1].classList.add('filter-element-secondary');
        options[filter - 1].classList.remove('filter-element');
        setFilter(id);
    }

    return (
        <div className="main-bar">
            <div className="update-card">
                <div className="top-section">
                    <span>UPDATES FROM GameConnect</span>
                </div>
                <div className="body">
                    <div className="context">
                        <span className="title">Keep yourself safe and informed</span>
                        <br />
                        <span className="description">The only way to play games at your best is to stay healthy. More fun for you and everyone!</span>
                    </div>
                    <img src="/pin.jpg" alt="pin"/>
                </div>
            </div>
            {
                type === 'community' ? null :
                <AddPost id={typeCheck()}/>
            }

            {typeCheck() === "" &&
            <div className="filter-container">
                 <div className="filter filter-element hoverable" onClick={e => {changeFilter(e,1)}}>
                    <NewReleases />
                    <span>New</span>
                </div>
                <div className="filter filter-element-secondary hoverable" onClick={e => {changeFilter(e,2)}}>
                    <WhatsHot />
                    <span>Hot</span>
                </div>
                <div className="filter filter-element-secondary hoverable" onClick={e => {changeFilter(e,3)}}>
                    <TrendingUp />
                    <span>Top</span>
                </div>
                <div className="spacer"></div>
                {/* <div className="filter-element-menu hoverable">
                    <Menu />
                    <ArrowDropDown />
                </div> */}
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