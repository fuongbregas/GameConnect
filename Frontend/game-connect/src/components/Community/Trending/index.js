import React from 'react';

import './TrendingElements.css';

import trendingItems from '../../../data/trending-items.json';

export default function Trending() {
    return (
        <div className="trending-today-section">
           <span className="title">Trending today</span>
           <div className="items">
               {trendingItems.map((item, index) => (
                   <div className="trending-item hoverable" style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 35%, transparent), url(${item.image_src})` }}>
                       <div className="context">
                            <span className="title">{item.title}</span>
                            <br />
                            <span className="description">{item.description}</span>
                            <div className="subreddit">
                                <img src={item.subreddit.image_src} />
                                <span>r/{item.subreddit.name}</span>
                            </div>
                       </div>
                    </div>
               ))}
           </div>
        </div>
    )
}