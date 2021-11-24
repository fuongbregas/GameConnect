import React from 'react';
import './SideBarElements.css';
import communities from "../../../data/communities.json";
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

export default function SideBar() {
    return (
        <div className="side-bar">
            <div className="community-section">
               <div className="title">
                   <span className="hoverable">Today's Top Communities</span>
                </div>
               <div className="communities-wrapper">
                   {communities.map((community, index) => (
                        <div className="community hoverable" key={community.name}>
                            <span>{index+1}</span>
                            <ArrowDropUp />
                            <img src={community.cover} alt="community cover" />
                            <span className="name">{community.name}</span>
                        </div>
                    ))}
               </div>
            </div>
        </div>
    )
}