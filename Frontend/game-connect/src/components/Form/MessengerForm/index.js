import axios from 'axios';
import Conversation from '../../Conversation/index'
import Message from '../../Message/index'
import './MessengerFormElements.css'
import {React, useEffect, useState, useRef,} from 'react';

const Messenger = () => {

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className= "chatMenuWrapper">
                        <input placeholder="Search Messenger" className="chatMenuInput"/>
                        <Conversation/><Conversation/><Conversation/>
                    </div>
                </div>

                <div className="chatBox">
                    <div className= "chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message own = {true}/>
                            <Message/>
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatInput" placeholder="Aa">

                            </textarea>

                            <button className="sendButton">
                                Send
                            </button>
                        </div>
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

export default Messenger;