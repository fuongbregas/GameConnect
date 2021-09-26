import axios from 'axios';
import {React, useContext, useRef, useState} from 'react';
import {Background, 
    NewConversationWrapper, 
    NoConversationText,
    SearchUserInput,
    NewConversationInput,
    SendButton,
    } from './NewConversationElement';
    import {AuthContext} from '../../../context/AuthContext';

const NewConversation = ({setCurrentChat}) => {
    const {user} = useContext(AuthContext);
    const receiver = useRef();
    const messageText = useRef();
    const [error_checker, setError] = useState('');

    const createConversationSubmit = async (event) => {
        event.preventDefault();
        const sender = user;
        
        try {
            
            const res1 = await axios.get('backend/conversations/get_one_conversation/' + sender + '/' + receiver.current.value);
            console.log(res1);
            if (res1.data == null) {
                // No conversation, create one
                const new_conversation = {
                    sender_username : sender, 
                    receiver_username: receiver.current.value,
                }
                // Create new conversation
                const res2 = await axios.post('backend/conversations/', new_conversation );
                
                if(res2.status == 200) {
                    // Create new message
                    const conversation_data = res2.data;
                    const message = {
                        sender_username: user,
                        message_content: messageText.current.value,
                        is_deleted: false,
                        conversation_id: conversation_data._id,
                    };
    
                    const res3 = await axios.post('backend/messages/', message);
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

                const res2 = await axios.post('backend/messages/', message);
                setCurrentChat(conversation_data);               
            }
        }
        catch (error){
            console.log(error);
        }
    }

    return (
        <>
            <NoConversationText>Start a conversation.</NoConversationText> 
                <Background >
                    <NewConversationWrapper onSubmit={createConversationSubmit}>
                        <SearchUserInput placeholder='Enter username' required ref={receiver}/>
                        <NewConversationInput placeholder='Aa' required ref={messageText}/>
                        <SendButton type='submit'>Send</SendButton>
                    </NewConversationWrapper>
                    
                </Background>
            
            
        </>
    );
}

export default NewConversation;