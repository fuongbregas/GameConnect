import styled from "styled-components";
import {MdClose} from 'react-icons/md'

export const Background = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

export const NewConversationWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    border-radius: 10px;
`

export const NoConversationText = styled.span`
    position:absolute;
    z-index: 2;
    color: rgb(224, 220, 220);
    top: 10%;
    font-size:50px;
    text-align: center;
    cursor: default;
`

export const CloseButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 7;
`