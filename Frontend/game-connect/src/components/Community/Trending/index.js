import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './TrendingElements.css';

export default function Trending() {
    /*MERGE TEST COMMENT*/
    const history = useHistory();
    const [top, setTop] = useState([]);
    const [initial] = useState(true);

    // Get top 5 games
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getData = async () => {
            try {
                const res = await axios.get('/backend/game/top', {
                    cancelToken: source.token,
                });
                setTop(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        };
        getData();
        return () => {
            source.cancel();
        }
    }, [initial]);

    // Get full path to image cover
    const getURL = (path) => {
        return 'http://' + path;
    }

    return (
        <div className="trending-today-section">
           <span className="title">Trending PC games</span>
           <div className="items">
               {top.map((item) => (
                   <div className="trending-item hoverable" 
                        style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 35%, transparent), url(' + getURL(item.cover) + ')' }}
                        key={item.name}
                        onClick={e => {history.push(`/game/${item.id}`)}}    
                    >
                       <div className="context">
                            <span className="title">{item.name}</span>
                            <br />
                            <span className="description">{item.summary}</span>
                            {/* <div className="subconnect">
                                <img src={item.community.cover} />
                                <span>g/{item.community.name}</span>
                            </div> */}
                       </div>
                    </div>
               ))}
           </div>
        </div>
    )
}