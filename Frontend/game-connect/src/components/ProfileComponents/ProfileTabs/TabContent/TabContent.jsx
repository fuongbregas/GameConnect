import { React, useState, useEffect } from 'react';
import './TabContent.css';
import axios from 'axios';
import GameContent from './GameContent/GameContent';
import UserContent from './UserContent/UserContent';
import PostContent from './PostContent/PostContent';
import CommentContent from './CommentContent/CommentContent';

const TabContent = ({ type, username, URL }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [nextData, setNextData] = useState([]);

    // Preload data for current page
    useEffect(() => {
        const source = axios.CancelToken.source();
        // Get data for current page
        const getData = async () => {
            try {
                const res = await axios.get(URL + username + '/' + pageNumber, {
                    cancelToken: source.token,
                });
                setData(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        };

        if (username !== '' && username !== null) {
            getData();
        }
        return () => {
            source.cancel();
        }
    }, [URL, username, pageNumber]);

    // Preload data for next page
    useEffect(() => {
        const source = axios.CancelToken.source();
        // Get data for next page
        const getNextData = async () => {
            try {
                const nextPage = pageNumber + 1;
                const res = await axios.get(URL + username + '/' + nextPage, {
                    cancelToken: source.token,
                });
                setNextData(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        };

        if (username !== '' && username !== null) {
            getNextData();
        }

        return () => {
            source.cancel();
        }
    }, [URL, username, pageNumber]);

    const goNext = () => {
        setPageNumber(pageNumber + 1);
    }

    const goBack = () => {
        setPageNumber(pageNumber - 1);
    }

    return (
        <div className='tab-content-container'>
            <div className='top-container'>
                {
                    type === 'Games' ? <GameContent data={data} />
                        : type === 'Users' ? <UserContent data={data} />
                            : type === 'Posts' ? <PostContent data={data} />
                                : type === 'Comments' ? <CommentContent data={data} />
                                    : null
                }
            </div>
            {
                data.length === 0 ? <h1 className='nothing'>Nothing yet</h1> :
                    <div className='bottom-container'>
                        <button className='page-button' onClick={goBack} disabled={
                            pageNumber === 1 ? true : false
                        }>{'<'} Previous</button>
                        {' | '}
                        <button className='page-button' onClick={goNext} disabled={
                            nextData.length === 0 ? true : false
                        }>Next {'>'}</button>
                    </div>
            }
        </div>
    );
};

export default TabContent;