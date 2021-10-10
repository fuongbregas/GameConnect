import axios from 'axios';
import {io} from 'socket.io-client';
import Conversation from '../../ChatComponents/Conversation/index'
import Message from '../../ChatComponents/Message/index'
import Online from '../../ChatComponents/Online/index'
import NewConversation from '../../ChatComponents/New Conversation/index';
import './MessengerFormElements.css'
import {React, useContext, useEffect, useState, useRef,} from 'react';
import {MdCreate} from 'react-icons/md'
import {AuthContext} from '../../../context/AuthContext';
const Messenger = () => {

    // All the states of different components
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [friendList, setFriendList] = useState([]);
    
    const socket = useRef();

    // Username
    const {user} = useContext(AuthContext);

    // Autoscroll when new message added
    const scrollRef = useRef();
    
    // Run socket connection once
    useEffect(() => {
        socket.current = io('ws://localhost:6969');
        // Get message from socket
        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.sender,
                message_content : data.message_content,
                createdAt: Date.now(),
            });
        });
    }, []);

    
    useEffect(() => {
        // Add user to Socket
        socket.current.emit('addUser', user);
        // Get friends from the backend
        
        // Get all users from socket server
        socket.current.on('getUsers', users => {
            setOnlineUsers(
                friendList.filter((each_friend) => users.some((each_socket_user) => each_socket_user.userName === each_friend.username))
            );
        });
    }, [user, friendList]);
    //console.log('Online message', onlineUsers);

    // if there is new message
    useEffect(() => {
        arrivalMessage && currentChat?.users.includes(arrivalMessage.sender) &&
        setMessages((previousMessage) => [...previousMessage, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

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
    const sendMessageSubmit = async (event) => {
        event.preventDefault();
        const message = {
            sender_username: user,
            message_content: newMessage,
            is_deleted: false,
            conversation_id: currentChat._id,
        };

        // Find the username who is not 'user' in the current conversation
        const receiver = currentChat.users.find(member => member !== user);
        
        socket.current.emit('sendMessage', {
            sender: user,
            receiver,
            message_content : newMessage,
        });

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


    // Show the Create Conversation overlay
    const openNewConversation = () => {
        setCurrentChat(null);
    }

    // Get friend list from backend   
    useEffect(() => {
        const getFriendLists = async (user) => {
            try {
                const res = await axios.get("backend/users/friends/" + user);
                setFriendList(res.data);
            }   
            catch (error) {
                console.error(error);
            }
        }

        getFriendLists(user);
    }, [user, friendList]);

    return (
        <>
            <div className="messenger">
            
                <div className="chatMenu">
                    <div className= "chatMenuWrapper">
                        <div className = 'buttonWrapper'>
                            <MdCreate className = 'createConversationButton' onClick= {openNewConversation}></MdCreate>                            
                        </div>
                        
                        <input placeholder="Search Messenger" className="chatMenuInput"/>                        
                        {conversations.map((each_conversation) => (
                            <div key={each_conversation._id} onClick={() => setCurrentChat(each_conversation)}>
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
                                        <div key = {each_message._id} ref = {scrollRef}>                                            
                                            <Message  message = {each_message} own = {each_message.sender_username === user}/>
                                        </div>
                                    ))}
                                    
                                
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatInput" placeholder="Aa"
                                              onChange = {(event) => setNewMessage(event.target.value)}
                                              value = {newMessage}>
                                    
                                    </textarea>

                                    <button className="sendButton" onClick={sendMessageSubmit}>
                                        Send
                                    </button>
                                </div> 
                            </> : <NewConversation setCurrentChat = {setCurrentChat} setConversations = {setConversations}/>
                                        
                        }
                    </div>
                </div>

                <div className="online">                    
                    <div className= "onlineWrapper">
                        <div className="onlineTop">
                            <span className="onlineLabel">Online Friends</span>
                        </div>
                        <Online onlineUsers = {onlineUsers} currentUser = {user} setCurrentChat = {setCurrentChat}/>
                        
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Messenger;