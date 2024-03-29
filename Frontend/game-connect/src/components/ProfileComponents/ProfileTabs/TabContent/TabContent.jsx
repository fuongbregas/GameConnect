import {React, useState, useEffect} from 'react';
import './TabContent.css';
import axios from 'axios';
import GameContent from './GameContent/GameContent';
import UserContent from './UserContent/UserContent';
import PostContent from './PostContent/PostContent';
import CommentContent from './CommentContent/CommentContent';

const TabContent = ({type, username, URL}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [nextData, setNextData] = useState([]);

    // Preload data for current page
    useEffect(() => {
        // Get data for current page
        const getData = async () => {
            const res = await axios.get(URL + username + '/' + pageNumber);
            setData(res.data);
        };

        if (username !== '' && username !== null){
            getData();
        }
    }, [URL, username, pageNumber]);

    // Preload data for next page
    useEffect(() => {
        // Get data for next page
        const getNextData = async () => {
            const nextPage = pageNumber + 1;
            const res = await axios.get(URL + username + '/' + nextPage);
            setNextData(res.data);
        };

        if (username !== '' && username !== null){
            getNextData();
        }
    }, [URL, username, pageNumber]);

    const goNext = () => {
        setPageNumber(pageNumber + 1);
    }

    const goBack = () => {
        setPageNumber(pageNumber - 1);
    }
    
    return (
        <div className = 'tab-content-container'>
            <div className = 'top-container'>
                {
                    type === 'Games' ? <GameContent data = {data}/> 
                    : type === 'Users' ? <UserContent data = {data}/>
                    : type === 'Posts' ? <PostContent data = {data}/>
                    : type === 'Comments' ? <CommentContent data = {data}/>
                    : null
                }
            </div>
            {
                data.length === 0 ? <h1 className = 'nothing-here'>Nothing yet</h1> :
                <div className = 'bottom-container'>
                    <button className = 'page-button' onClick={goBack} disabled = {
                                pageNumber === 1 ? true : false
                            }>{'<'} Previous</button>
                    {' | '}
                    <button className = 'page-button' onClick={goNext} disabled = {
                                nextData.length === 0 ? true : false
                            }>Next {'>'}</button>
                </div>
            }            
        </div>
    );
};

export default TabContent;