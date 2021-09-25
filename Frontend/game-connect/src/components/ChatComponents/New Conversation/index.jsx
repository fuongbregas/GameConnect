import React from 'react';
import {Background, 
    NewConversationWrapper, 
    NoConversationText,
    CloseButton} from './NewConversationElement';
const NewConversation = () => {
    return (
        <>
            <NoConversationText>Start a conversation.</NoConversationText> 
                <Background >
                    <NewConversationWrapper>
                        
                    </NewConversationWrapper>
                </Background>
            
            
        </>
    );
}

export default NewConversation;