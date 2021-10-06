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
    } from './NewConversationElement';
    import {AuthContext} from '../../../context/AuthContext';

const NewConversation = ({setCurrentChat, setConversations}) => {
    const {user} = useContext(AuthContext);
    const receiver = useRef();
    const messageText = useRef();
    const [error_checker, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [usernameInput, setUsernameInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Get user when there is an input
    useEffect(() => {
        var receiver_text = receiver.current.value;
        var url = 'backend/users/autosearch?key=' + receiver_text;

        const loadUsers = async () => {
            try {
                const res = await axios.get(url);
                console.log("User data: " + res.data);
                setUsers(res.data);
            }   
            catch (error) {
                console.log(error);
            }
        }

        loadUsers();
    }, []);

    const onChangeHandler = (usernameInput) => {
        let matches = [];
        if (usernameInput.length > 0) {
            matches = users.filter (user => {
                const regex = new RegExp(`${usernameInput}`, 'gi');
                return user.username.match(regex);
            });
        }
        //console.log('matches', matches);
        setSuggestions(matches);
        //console.log('suggestions', suggestions);
        setUsernameInput(usernameInput);
    }
    
    const onSuggestHandler = (usernameInput) => {
        setUsernameInput(usernameInput);
        setSuggestions([]);
    }
    

    // When submit button is clicked
    const createConversationSubmit = async (event) => {
        event.preventDefault();
        const sender = user;
        
        try {
            /*  Check if there is a conversation between two users
                If there is a conversation, add message to the conversation without creating a new one.
                If there is no conversation, create a new one and add the message.
            */
            const res0 = await axios.get('backend/users?username=' + receiver.current.value);
            if(res0.status === 200) {
                const res1 = await axios.get('backend/conversations/get_one_conversation/' + sender + '/' + receiver.current.value);
                
                if (res1.data == null) {
                    // No conversation, create one
                    const new_conversation = {
                        sender_username : sender, 
                        receiver_username: receiver.current.value,
                    }
                    // Create new conversation
                    const res2 = await axios.post('backend/conversations/', new_conversation );
                    
                    if(res2.status === 200) {
                        // Create new message
                        const conversation_data = res2.data;
                        const message = {
                            sender_username: user,
                            message_content: messageText.current.value,
                            is_deleted: false,
                            conversation_id: conversation_data._id,
                        };
                        
                        // Add new message to the recently created conversation
                        await axios.post('backend/messages/', message);
                        setCurrentChat(conversation_data);
                        const res4 = await axios.get("backend/conversations/" + user);
                        // Set the new conversation to the side bar
                        setConversations(res4.data);  
                    }
                    else {
                        console.log(res2);
                    }
                }   
                else {
                    // Conversation exists, add nessage
                    const conversation_data = res1.data;
                    const message = {
                        sender_username: user,
                        message_content: messageText.current.value,
                        is_deleted: false,
                        conversation_id: conversation_data._id,
                    };
                    // Add new message to the existed conversation
                    await axios.post('backend/messages/', message);
                    setCurrentChat(conversation_data);               
                }
            }
            else {
                setError(res0.status);
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
                                         onBlur = {() => {
                                             setTimeout(() => {
                                                setSuggestions([]);
                                             }, 100);
                                         }}
                                         value = {usernameInput}
                                         type = 'text'
                                         required 
                                         ref={receiver}/>
                        {suggestions && suggestions.map((each_suggestion) => 
                            <SuggestionBox key = {each_suggestion._id} onClick = {() => onSuggestHandler(each_suggestion.username)}>
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