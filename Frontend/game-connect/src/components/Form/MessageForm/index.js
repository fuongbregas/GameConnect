import axios from 'axios';
import Conversation from '../../Conversation/index'
import './MessageFormElements.css'
import {React, useEffect, useState, useRef,} from 'react';

const Message = () => {

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className= "chatMenuWrapper">
                        <input placeholder="Search Messenger" className="chatMenuInput"/>
                        <Conversation/>
                    </div>
                </div>

                <div className="chatBox">
                    <div className= "chatBoxWrapper">
                        chat
                    </div>
                </div>

                <div className="chatOnline">
                    <div className= "chatOnlineWrapper">
                        Online
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Message;