import axios from 'axios';
import {React, useContext, useRef, useState, useEffect} from 'react';
import {Background, 
    NewConversationWrapper, 
    NoConversationText,
    SearchUserInput,
    NewConversationInput,
    SendButton,
    SuggestionBox,
    Error,
    ProfilePicture,
    } from './NewConversationElement';
    import {AuthContext} from '../../../context/AuthContext';

const NewConversation = ({setCurrentChat, setConversations, setMessages, socket}) => {
    const {user} = useContext(AuthContext);
    const receiver = useRef();
    const messageText = useRef();
    const [error_checker, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [usernameInput, setUsernameInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    // Get user when there is an input
    useEffect(() => {
        const source = axios.CancelToken.source();
        var receiver_text = receiver.current.value;
        var url = 'backend/users/autosearch?key=' + receiver_text;

        const loadUsers = async () => {
            try {
                const res = await axios.get(url, {
                    cancelToken: source.token,
                });
                setUsers(res.data);
            }   
            catch (error) {
                if (axios.isCancel(error)){

                } else {
                    console.log(error);
                }
            }
        }

        loadUsers();

        return () => {
            source.cancel();
        }
    }, [receiver]);

    const onChangeHandler = (usernameInput) => {
        let matches = [];
        if (usernameInput.length > 0) {
            matches = users.filter (user => {
                const regex = new RegExp(`${usernameInput}`, 'gi');
                return user.username.match(regex);
            });
        }
        setSuggestions(matches);
        setUsernameInput(usernameInput);
    }
    
    const onSuggestHandler = (usernameInput) => {
        setUsernameInput(usernameInput);
        setSuggestions([]);
    }
    

    // When submit button is clicked
    const createConversationSubmit = async (event) => {
        event.preventDefault();
        const sender_user = user;
        const receiver_user = receiver.current.value;
        const message_content= messageText.current.value;

        try {
            if (sender_user !== receiver_user) {
                const data = {
                    sender_username: sender_user,
                    receiver_username: receiver_user,
                    message_content: message_content,
                };
                const res = await axios.post('backend/conversations', data);
                setConversations(res.data.conversations);
                setMessages(res.data.messages);
                setCurrentChat(res.data.savedConversation);
                
                socket.current.emit('sendMessage', {
                    sender: user,
                    receiver: receiver_user,
                    message_content: message_content,
                });
            }
            else {
                const data = {
                    sender_username: sender_user,
                    receiver_username: sender_user,
                    message_content: message_content,
                }
                const res = await axios.post('backend/conversations/self', data);
                setConversations(res.data.conversations);
                setMessages(res.data.messages);
                setCurrentChat(res.data.savedConversation);
            }
        }
        catch (error){
            setError(error);
            console.log(error);
        }
    }
    
    return (
        <>
            <NoConversationText>Start a conversation.</NoConversationText> 
                <Background >
                    <NewConversationWrapper onSubmit={createConversationSubmit}>
                        
                        <SearchUserInput placeholder='Enter username' 
                                         onChange = {event => onChangeHandler(event.target.value)}
                                         value = {usernameInput}
                                         type = 'text'
                                         required 
                                         ref={receiver}/>
                        {suggestions && suggestions.map((each_suggestion) => 
                            <SuggestionBox  key = {each_suggestion._id} 
                                            onClick = {() => onSuggestHandler(each_suggestion.username)}>
                                <ProfilePicture
                                    src = {
                                        each_suggestion.profile_picture !== ''
                                        ? each_suggestion.profile_picture
                                        : '/avatar.png'
                                    }
                                    alt = ''
                                    referrerPolicy="no-referrer"/>
                                {each_suggestion.username}
                            </SuggestionBox>
                        )}
                        {
                            error_checker ? <Error> The user does not exist </Error>
                            : null
                        }
                        <NewConversationInput placeholder='Aa' required ref={messageText}/>
                        <SendButton type='submit'>Send</SendButton>
                    </NewConversationWrapper>
                    
                </Background>
            
            
        </>
    );
}

export default NewConversation;