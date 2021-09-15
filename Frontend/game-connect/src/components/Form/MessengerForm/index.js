import axios from 'axios';
import Conversation from '../../ChatComponents/Conversation/index'
import Message from '../../ChatComponents/Message/index'
import Online from '../../ChatComponents/Online/index'
import './MessengerFormElements.css'
import {React, useContext, useEffect, useState, useRef,} from 'react';
import {AuthContext} from '../../../context/AuthContext';
const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const {user} = useContext(AuthContext);
    
    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("backend/conversations/" + user);
            setConversations(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        getConversations();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('backend/messages/' + currentChat?._id);
                setMessages(res.data);
            }
            catch (error) {
                console.log(error);
            }            
        }

        getMessages();
    }, [currentChat]);

    
    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className= "chatMenuWrapper">
                        <input placeholder="Search Messenger" className="chatMenuInput"/>
                        {conversations.map((each_conversation) => (
                            <div onClick={() => setCurrentChat(each_conversation)}>
                                <Conversation conversation={each_conversation} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatBox">
                    <div className= "chatBoxWrapper">
                        {
                            currentChat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(each_message => (
                                        <Message message = {each_message} own = {each_message.sender_username === user}/>
                                    ))}
                                    
                                
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatInput" placeholder="Aa">

                                    </textarea>

                                    <button className="sendButton">
                                        Send
                                    </button>
                                </div> 
                            </> : <span className='noConversationText'>Start a conversation.</span> }
                    </div>
                </div>

                <div className="online">                    
                    <div className= "onlineWrapper">
                        <div className="onlineTop">
                            <span className="onlineLabel">Online Friends</span>
                        </div>
                        <Online/>
                        <Online/>
                        <Online/>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Messenger;