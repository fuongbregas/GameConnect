import axios from 'axios';
import './ConversationElements.css';
import {useEffect, useState,} from 'react';

const Conversation = () => {


    return (
       <div className="conversation">
           <img
                className="conversationImage"
                src='https://www.jellykey.com/wp-content/uploads/jellykey-retro-tv-35-1536x1536.jpg'
                alt=''
           />
           <span className="conversationName">Poker</span>
       </div>
    );
}

export default Conversation;