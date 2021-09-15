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
    const [newMessage, setNewMessage] = useState('');
    // Username
    const {user} = useContext(AuthContext);

    // Autoscroll when new message added
    const scrollRef = useRef();
    
    // Changes if there is new conversation
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

    // Changes if there is new message
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

    // Submit new messages
    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = {
            sender_username: user,
            message_content: newMessage,
            is_deleted: false,
            conversation_id: currentChat._id,
        };

        try {
            const res = await axios.post('backend/messages/', message);
            setMessages([...messages, res.data]);
            setNewMessage('');
        }
        catch (error) {
            console.log(error);
        }
    }

    // Scroll down to bottom of message screen
    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

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
                                        <div ref = {scrollRef}>                                            
                                            <Message message = {each_message} own = {each_message.sender_username === user}/>
                                        </div>
                                    ))}
                                    
                                
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatInput" placeholder="Aa"
                                              onChange = {(event) => setNewMessage(event.target.value)}
                                              value = {newMessage}>
                                    
                                    </textarea>

                                    <button className="sendButton" onClick={handleSubmit}>
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