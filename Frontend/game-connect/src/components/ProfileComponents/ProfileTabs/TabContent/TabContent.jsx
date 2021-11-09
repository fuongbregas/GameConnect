import {React, useState, useEffect} from 'react';
import './TabContent.css';
import axios from 'axios';

const TabContent = ({username, URL}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);
    const [nextData, setNextData] = useState(null);

    // Get data for current page
    const getData = async () => {
        const res = await axios.get(URL + username + '/' + pageNumber);
        setData(res.data);
    };

    // Preload data for current page
    useEffect(() => {
        getData();
    }, [username, pageNumber]);

    // Get data for next page
    const getNextData = async () => {
        const nextPage = pageNumber + 1;
        const res = await axios.get(URL + username + '/' + nextPage);
        setNextData(res.data);
    };

    // Preload data for next page
    useEffect(() => {
        getNextData();
    }, [username, pageNumber]);

    const goNext = () => {
        setPageNumber(pageNumber + 1);
    }

    const goBack = () => {
        setPageNumber(pageNumber - 1);
    }
    console.log(nextData);
    return (
        <div>
            <button onClick={goBack}>Previous</button>
            <button onClick={goNext}>Next</button>
        </div>
    );
};

export default TabContent;