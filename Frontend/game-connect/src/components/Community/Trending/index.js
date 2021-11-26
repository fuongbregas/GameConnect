import React from 'react';

import './TrendingElements.css';

import trendingItems from '../../../data/trending-items.json';

export default function Trending() {
    /*MERGE TEST COMMENT*/
    return (
        <div className="trending-today-section">
           <span className="title">Trending PC games</span>
           <div className="items">
               {trendingItems.map((item) => (
                   <div className="trending-item hoverable" 
                        style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 35%, transparent), url(${item.cover})` }}
                        key={item.name}    
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