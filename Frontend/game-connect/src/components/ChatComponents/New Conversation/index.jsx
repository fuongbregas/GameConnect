import {React, useContext} from 'react';
import {Background, 
    NewConversationWrapper, 
    NoConversationText,
    SearchUserInput,
    NewConversationInput,
    SendButton,
    } from './NewConversationElement';
    import {AuthContext} from '../../../context/AuthContext';

const NewConversation = () => {
    const {user} = useContext(AuthContext);

    

    return (
        <>
            <NoConversationText>Start a conversation.</NoConversationText> 
                <Background >
                    <NewConversationWrapper>
                        <SearchUserInput placeholder='Enter username'/>
                        <NewConversationInput placeholder='Aa'/>
                        <SendButton>Send</SendButton>
                    </NewConversationWrapper>
                    
                </Background>
            
            
        </>
    );
}

export default NewConversation;