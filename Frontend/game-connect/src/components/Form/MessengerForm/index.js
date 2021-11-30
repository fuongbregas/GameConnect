import axios from 'axios';
//import { io } from 'socket.io-client';
import Conversation from '../../ChatComponents/Conversation/index'
import Message from '../../ChatComponents/Message/index'
import Online from '../../ChatComponents/Online/index'
import NewConversation from '../../ChatComponents/New Conversation/index';
import './MessengerFormElements.css'
import { React, useContext, useEffect, useState, useRef, } from 'react';
import { MdCreate } from 'react-icons/md'
import { AuthContext } from '../../../context/AuthContext';
const Messenger = ({socket}) => {

    // All the states of different components
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    // For pagination
    const [nextData, setNextData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    // Username
    const { user } = useContext(AuthContext);

    // Socket reference
    //const socket = useRef();
    //const ip = process.env.REACT_APP_IP;
    //const link = 'ws://' + ip + ':6969';
    // Autoscroll when new message added
    const scrollRef = useRef();

    // Load more button ref
    const loadMoarRef = useRef();

    // Scroll down to bottom of message screen

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [messages]);

    // Run socket connection once
    useEffect(() => {
        let mounted = true;
        //socket.current = io(link);

        // Get message from socket
        socket.current.on('getMessage', data => {
            if (mounted) {
                setArrivalMessage({
                    sender: data.sender,
                    message_content: data.message_content,
                    createdAt: Date.now(),
                });
            }
        });

        return function cleanup() {
            mounted = false;
        };
    }, /*[link]*/[socket]);

    // Add user to socket
    useEffect(() => {
        let mounted = true;
        // Add user to Socket
        socket.current.emit('addUser', user);

        // Get all users from socket server
        socket.current.on('getUsers', users => {
            if (mounted) {
                setOnlineUsers(users);
            }
        });

        return function cleanup() {
            mounted = false;
        };

    }, [user, socket]);

    // Remove a user from socket
    useEffect(() => {
        let mounted = true;
        socket.current.on('disconnect', () => {
            socket.current.emit('removeUser', socket.current.id);
        })

        socket.current.on('getUsers', users => {
            if (mounted) {
                setOnlineUsers(users);
            }
        });

        return function cleanup() {
            mounted = false;
        };
    }, [user, socket]);

    // if there is new message
    useEffect(() => {
        arrivalMessage && currentChat?.users.includes(arrivalMessage.sender) &&
            setMessages((previousMessage) => [...previousMessage, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // Changes if there is new conversation
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getConversations = async () => {
            try {
                const res = await axios.get("backend/conversations/" + user, {
                    cancelToken: source.token,
                });
                setConversations(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        };
        getConversations();
        return () => {
            source.cancel();
        }
    }, [user]);

    // Changes if there is more messages
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getNextMessages = async () => {
            try {
                const nextPageNumber = pageNumber + 1;
                const res = await axios.get('backend/messages/' + currentChat?._id + '/' + nextPageNumber, {
                    cancelToken: source.token,
                });
                setNextData(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        }

        getNextMessages();
        return () => {
            source.cancel();
        }
    }, [currentChat, pageNumber]);

    // Changes if there is new messages
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getMessages = async () => {
            try {
                const res = await axios.get('backend/messages/' + currentChat?._id + '/' + pageNumber, {
                    cancelToken: source.token,
                });
                setMessages(res.data);
            }
            catch (error) {
                if (axios.isCancel(error)) {

                } else {
                    console.log(error);
                }
            }
        }
        if (pageNumber === 1) {
            getMessages();
        }

        return () => {
            source.cancel();
        }
    }, [currentChat, pageNumber]);

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
            message_content: newMessage,
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

    // Show the Create Conversation overlay
    const openNewConversation = () => {
        setPageNumber(1);
        setMessages([]);
        setCurrentChat(null);
    }

    // Open a conversation
    const openConversation = async (each_conversation) => {
        setPageNumber(1);
        setCurrentChat(each_conversation);
        setTimeout(() => { setMessages([]) });
        const res = await axios.get('backend/messages/' + each_conversation._id + '/' + 1);
        setMessages(res.data);
    }

    // Load more button
    const loadMore = async () => {
        setPageNumber(pageNumber + 1);
        const newMessageList = nextData.concat(messages);
        setMessages(newMessageList);
        setTimeout(() => {
            loadMoarRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }, 100);
    }

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className='buttonWrapper'>
                            <MdCreate className='createConversationButton' onClick={openNewConversation}></MdCreate>
                        </div>
                        {/*
                        <input placeholder="Search Messenger" className="chatMenuInput"/>
                        */}
                        <div className='conversation-list'>
                            {
                                conversations.length !== 0 ?
                                    conversations.map((each_conversation) => (
                                        <div key={each_conversation._id} onClick={() => openConversation(each_conversation)}>
                                            <Conversation conversation={each_conversation} currentUser={user} />
                                        </div>
                                    ))
                                    : null
                            }
                        </div>
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        <div className='load-more-container' ref={loadMoarRef}>
                                            <button className='load-more-button' onClick={loadMore} disabled={
                                                nextData.length === 0 ? true : false
                                            }>Load Moar</button>
                                        </div>
                                        {messages.map((each_message, index) => (
                                            <div key={index} ref={scrollRef}>
                                                <Message
                                                    message={each_message}
                                                    sender={each_message.sender_username}
                                                    own={each_message.sender_username === user}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className="chatInput" placeholder="Aa"
                                            onChange={(event) => setNewMessage(event.target.value)}
                                            value={newMessage}>
                                        </textarea>
                                        <button className="sendButton" onClick={sendMessageSubmit} disabled={
                                            newMessage === '' ? true : false
                                        }>Send</button>
                                    </div>
                                </> : <NewConversation setCurrentChat={setCurrentChat} setConversations={setConversations} setMessages={setMessages} setPageNumber={setPageNumber} socket={socket} />
                        }
                    </div>
                </div>

                <div className="online">
                    <div className="onlineWrapper">
                        <div className="onlineTop">
                            <span className="onlineLabel">Online Friends</span>
                        </div>
                        <div className='online-list'>
                            {
                                onlineUsers.length !== 0 ?
                                    <Online onlineUsers={onlineUsers} currentUser={user} setCurrentChat={setCurrentChat} setPageNumber={setPageNumber} setMessages={setMessages} />
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;
